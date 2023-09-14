from django.shortcuts import render
from django.conf import settings
import numpy as np
import threading
import matplotlib.pyplot as plt
import cv2
import time
from myapp.raft_processing import RaftProcessing
from myapp.farneback_processing import FarnebackProcessing
import queue
from myapp.MotionAnalyzer import MotionAnalyzer, RealTimePeakAnalyzer


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.set(cv2.CAP_PROP_BUFFERSIZE, 2)
        (self.grabbed, self.frame) = self.video.read()
        self.thread = threading.Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()
        self.frame_count = 0
        self.frame_height = 680
        self.frame_width = 480


        #####Lucas Kanade########
        # parameters for sparse optical flow
        # self.maxCorners = 10
        # self.qualityLevel = 0.2
        # self.minDistance = 10
        # self.blockSize = 10

        # parameters for lucas kanade optical flow
        # self.winSize = (15, 15)
        # self.maxLevel = 2
        # self.criteria = (cv2.TERM_CRITERIA_EPS | cv2.TERM_CRITERIA_COUNT, 10, 0.03)

        # create some random colors
        # self.color = np.random.randint(0,255,(self.maxCorners,3))
        # self.p0 = cv2.goodFeaturesToTrack(self.old_gray, mask = None, maxCorners = self.maxCorners, qualityLevel = self.qualityLevel, minDistance = self.minDistance, blockSize = self.blockSize)
        # self.keypoints = [] 

   
        self.flow_queue = queue.Queue()

        # FPS = 1/X
        # X = desired FPS
        self.FPS = 1/30
        self.FPS_MS = int(self.FPS * 1000)


        # #########Farneabck Flow########
        self.old_gray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        self.gray = None


        self.flows = []
        self.frames = []
        self.start_time = time.time()
        self.record_time = 15
        self.generator = None

    def __del__(self):
        self.video.release()

    def get_frame(self, count):
        if time.time() - self.start_time > self.record_time:
            self.video.release()
            return None
        if not self.video.isOpened():
            return None
        else:
            rgb = self.process_frame()
            image = cv2.resize(self.frame, (self.frame_height, self.frame_width))
            self.frames.append(image)
            fps = self.video.get(cv2.CAP_PROP_FPS)
            print("Frames per second: {0}".format(fps))
        _, jpeg = cv2.imencode('.jpg', image) #Change to rgb to see color hue or image to see normal stream

        return jpeg.tobytes()

    def process_frame(self):
        gray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        self.old_gray = cv2.resize(self.old_gray, (self.frame_height, self.frame_width))
        gray = cv2.resize(gray, (self.frame_height, self.frame_width))
        # Create a mask image for drawing purposes
        mask = np.zeros((*self.old_gray.shape, 3), dtype=np.uint8)
        mask[..., 1] = 255

        flow = cv2.calcOpticalFlowFarneback(self.old_gray, gray, None, 0.5, 3, 100, 3, 7, 1.1, 0)
        magnitude, direction = cv2.cartToPolar(flow[..., 0], flow[..., 1])
        # Sets image hue according to the optical flow direction
        mask[..., 0] = direction * 180 / np.pi / 2
        # Sets image value according to the optical flow magnitude (normalized)
        mask[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)
        # Converts HSV to RGB (BGR) color representation
        rgb = cv2.cvtColor(mask, cv2.COLOR_HSV2BGR)

        self.flow_queue.put(flow)
        self.flows.append(flow)

        return rgb
    

    def update(self):
        while True:
            if self.video.isOpened():
                (self.grabbed, self.frame) = self.video.read()

def gen(request, camera):
    count = 0
    analyzer = MotionAnalyzer(H=480, W=680)
    peak_analyzer = RealTimePeakAnalyzer()
    # time.sleep(2)
    while True:
        start_time = time.time()
        frame = camera.get_frame(count)
        rep = analyzer.analyze_frame(camera.flows[-1])
        if rep is not None:
            con_peak, ecc_peak, _, _ = peak_analyzer.analyze(rep[1])
            # print(rep.shape)
        end_time = time.time()
        count+=1
        print(f"Time to process frame: {end_time - start_time}")
        if frame is not None:
            yield(b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        else:
            print("Video stream ended.")
            peak_analyzer.save_peaks()
            analyzer.save_trajectories()
            break
            farneback = FarnebackProcessing()


            ###### Enter Code to run pipeline on frames here ######
            # start_time = time.time()
            # frames = np.asarray(camera.frames)
            # features = FarnebackProcessing().featurePreprocessing(frames)
            # end_time = time.time()
            # print(f"Time to engineer features on live stream: {end_time - start_time}")

            ####### This renders the color hue image post exercise for visualization purposes########
            for frame in camera.frames:
                for image in farneback.image_farneback_flow(frame):
                    if image is not None:
                        yield(b'--frame\r\n'
                            b'Content-Type: image/jpeg\r\n\r\n' + image + b'\r\n\r\n')
            ##################################################


            # images = RaftProcessing(camera.frames).calcOpticalFlow()
            # print(type(images))
            # gif = RaftProcessing.create_gif(images)
            # print(gif)
            # if gif is not None:
            #     yield(b'--frame\r\n'
            #         b'Content-Type: text/html\r\n\r\n' +
            #         b'<script>showGif();</script>' +
            #         b'\r\n\r\n')
            break
