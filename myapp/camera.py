import os, urllib.request
from django.conf import settings
import numpy as np
import threading
import torchvision.transforms as transforms
import torch
import torchvision.transforms.functional as F
from torchvision.models.optical_flow import Raft_Large_Weights, Raft_Small_Weights
from torchvision.models.optical_flow import raft_large, raft_small
from PIL import Image
from torchvision.utils import flow_to_image
import matplotlib.pyplot as plt
import cv2
import time
from torchvision.io import write_jpeg


class VideoCamera(object):
    def __init__(self):
        self.video = cv2.VideoCapture(0)
        self.video.set(cv2.CAP_PROP_BUFFERSIZE, 2)
        (self.grabbed, self.frame) = self.video.read()
        self.thread = threading.Thread(target=self.update, args=())
        self.thread.daemon = True
        self.thread.start()
        self.frame_count = 0

        # FPS = 1/X
        # X = desired FPS
        self.FPS = 1/30
        self.FPS_MS = int(self.FPS * 1000)

        frame_width = int(self.video.get(3))
        frame_height = int(self.video.get(4))
   
        size = (frame_width, frame_height)


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
        self.frames_2 = []
        self.start_time = time.time()
        self.record_time = 5
        self.generator = None

        #For recording a livestream
        self.fourcc = cv2.VideoWriter_fourcc(*'MJPG')
        self.out = cv2.VideoWriter('filename.avi', self.fourcc, 30.0, size)

    def __del__(self):
        self.video.release()
        self.out.release()


    def preprocess(raft_weights, img1_batch, img2_batch):
        weights = raft_weights
        transforms = weights.transforms()
        img1_batch = F.resize(img1_batch, size=[256, 328], antialias=False)
        img2_batch = F.resize(img2_batch, size=[256, 328], antialias=False)
        return transforms(img1_batch, img2_batch)
    
    def calcOpticalFlow(self, batch_size=10):
        flows = []
        frames_1 = np.stack(self.frames)
        end=batch_size
        start=0
        device = torch.device("mps")
        torch.mps.empty_cache()
        model = raft_small(weights=Raft_Small_Weights.DEFAULT, progress=True).to(device)

        # We have enough frames for a batch, process it
        while end < len(frames_1)+1:
            torch.mps.empty_cache()
            batch_1 = torch.tensor(frames_1[start:end]).permute(0, 3, 1, 2).float() 
            batch_2 = torch.tensor(frames_1[start+1:end+1]).permute(0, 3, 1, 2).float() 
            img1_batch, img2_batch = VideoCamera.preprocess(Raft_Small_Weights.DEFAULT, batch_1, batch_2)
            with torch.no_grad():
                list_of_flows = model(img1_batch.to(device), img2_batch.to(device))
            print('Model fitted')
            del img1_batch, img2_batch
            torch.mps.empty_cache()
            predicted_flow = list_of_flows[-1]
            del list_of_flows
            start+=batch_size
            end+=batch_size
            im_flow=predicted_flow[0]
            del predicted_flow
            flow_img = flow_to_image(im_flow).to("cpu").permute(1,2,0).numpy()
            print(flow_img.shape)
            flows.append(flow_img)
        flows = np.asarray(flows)
        np.save('flows.npy', flows)


    def get_frame(self):
        cv2.waitKey(self.FPS_MS)
        image = self.frame
        # gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # image = cv2.resize(image, (640, 480))
        # self.frames.append(image)
        # fps = self.video.get(cv2.CAP_PROP_FPS)
        # print("Frames per second: {0}".format(fps))
        if time.time() - self.start_time > self.record_time:
            end_time = time.time()
            print(f"Processing Time: {end_time - self.start_time}")
            self.__del__()
            # frames = np.stack(self.frames)
            # np.save('frames.npy', frames)
        else:
            self.frame_count += 1  # Increment the frame counter
            print(f"Frame {self.frame_count} captured at {time.time()}")


        # if time.time() - self.start_time > self.record_time:
        #     if self.generator is None:
        #         self.calcOpticalFlowInProgress = True
        #         self.generator = self.calcOpticalFlow()
        #     try:
        #         return next(self.generator)
        #     except StopIteration:
        #         self.calcOpticalFlowInProgress = False
        #         return None
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
        image = cv2.resize(image, (256,328))
        self.out.write(image)
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

def gen(camera):
    while True:
        frame = camera.get_frame()
        yield(b'--frame\r\n'
            b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
    
