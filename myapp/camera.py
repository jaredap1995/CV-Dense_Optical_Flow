from django.shortcuts import render
from django.conf import settings
import numpy as np
import threading
import matplotlib.pyplot as plt
import cv2
import time
from myapp.processing import VideoProcessing


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.set(cv2.CAP_PROP_BUFFERSIZE, 3)
        (self.grabbed, self.frame) = self.video.read()
        self.thread = threading.Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()
        self.frame_count = 0

        # FPS = 1/X
        # X = desired FPS
        self.FPS = 1/30
        self.FPS_MS = int(self.FPS * 1000)

        self.frame_width = int(self.video.get(3))
        self.frame_height = int(self.video.get(4))
   
        self.size = (self.frame_width, self.frame_height)


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


        #########Farneabck Flow########
        self.old_frame = self.frame
        self.old_gray = cv2.cvtColor(self.old_frame, cv2.COLOR_BGR2GRAY)

        # Create a mask image for drawing purposes
        self.mask = np.zeros_like(self.old_frame)
        self.mask[..., 1] = 255


        self.frames = []
        # self.frames_2 = []
        self.start_time = time.time()
        self.record_time = 5
        self.generator = None

        # # For recording a livestream and saving it as a video....Not needed for actual livestream
        # self.fourcc = cv2.VideoWriter_fourcc(*'MJPG')
        # self.out = cv2.VideoWriter('filename.avi', self.fourcc, 30.0, self.size)

    def __del__(self):
        self.video.release()
        self.out.release()

    def get_frame(self, count):
        if time.time() - self.start_time > self.record_time:
            self.video.release()
            return None
        if not self.video.isOpened():
            return None
        else:
            image = self.frame
            self.frames.append(image)
            cv2.imwrite(f'static/frame{count}.jpg', image)
        # else:
        #     self.frame_count += 1  # Increment the frame counter
        #     print(f"Frame {self.frame_count} captured at {time.time()}")


        # else:
            # flow = cv2.calcOpticalFlowFarneback(self.old_gray, gray, None, 0.5, 3, 100, 3, 7, 1.1, 0)
            # magnitude, direction = cv2.cartToPolar(flow[..., 0], flow[..., 1])

            # # Sets image hue according to the optical flow direction
            # self.mask[..., 0] = direction * 180 / np.pi / 2
            # # Sets image value according to the optical flow magnitude (normalized)
            # self.mask[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)
            # # Converts HSV to RGB (BGR) color representation
            # rgb = cv2.cvtColor(self.mask, cv2.COLOR_HSV2BGR)
            

            # bgr = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)
            # combined = np.hstack((rgb, image))
        # image = cv2.resize(image, (256,328))
        _, jpeg = cv2.imencode('.jpg', image)

        
        return jpeg.tobytes()




        ######Farneabck Flow########
        # # calculate optical flow
        # flow = cv2.calcOpticalFlowFarneback(self.old_gray, gray, None, 0.5, 3, 100, 3, 7, 1.1, 0)
        # magnitude, direction = cv2.cartToPolar(flow[..., 0], flow[..., 1])

        # # Sets image hue according to the optical flow direction
        # self.mask[..., 0] = direction * 180 / np.pi / 2
        # # Sets image value according to the optical flow magnitude (normalized)
        # self.mask[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)
        # # Converts HSV to RGB (BGR) color representation
        # rgb = cv2.cvtColor(self.mask, cv2.COLOR_HSV2BGR)

        ######Lucaks Kanade Flow########
        # # draw the tracks
        # for i,(new,old) in enumerate(zip(good_new,good_old)):
        #     a,b = map(int, new.ravel())
        #     c,d = map(int, old.ravel())
        #     self.mask = cv2.line(self.mask, (a,b),(c,d), self.color[i].tolist(), 2)
        #     image = cv2.circle(image,(a,b),5,self.color[i].tolist(),-1)
        #     self.keypoints.append((a, b))  # Append the keypoints to the list

        # Now update the previous frame and previous points
        # self.old_gray = gray.copy()
        # self.p0 = good_new.reshape(-1,1,2)



        # fps = self.video.get(cv2.CAP_PROP_FPS)
        # print("Frames per second: {0}".format(fps))


    def update(self):
        while True:
            if self.video.isOpened():
                (self.grabbed, self.frame) = self.video.read()
            time.sleep(self.FPS)

def gen(request, camera):
    count = 0
    while True:
        start_time = time.time()
        frame = camera.get_frame(count)
        end_time = time.time()
        count+=1
        print(f"Time to process frame: {end_time - start_time}")
        if frame is not None:
            yield(b'--frame\r\n'
                b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
        else:
            print("Video stream ended.")
            images = VideoProcessing(camera.frames).calcOpticalFlow()
            print(type(images))
            # print('length of images', len(images))
            gif = VideoProcessing.create_gif(images)
            print(gif)
            if gif is not None:
                return render(request, 'home.html', {'gif_path': gif})
            #     yield(b'--frame\r\n'
            #         b'Content-Type: image/gif\r\n\r\n' + gif + b'\r\n\r\n')
            # break
        
