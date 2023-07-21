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
import imageio



class VideoProcessing:
    def __init__(self, frames, batch_size=10):
        self.generator = None
        self.batch_size = batch_size
        self.device = torch.device('mps')
        self.model = raft_small(weights=Raft_Small_Weights.DEFAULT, progress=True).to(self.device)
        self.frames = frames


    def create_gif(flows):
        try:
            gif_path = 'static/output.gif'
            imageio.mimsave(gif_path, flows)
            return gif_path
        except Exception as e:
            print(f"An error occurred creating the gif: {e}")
            return None


    def prepare_image_batches (self, frames_min, frames_max):
        
        batch_1_frames=[torch.tensor(np.array(frame)) for frame in self.frames[::2]]
        batch_1_frames = torch.stack(batch_1_frames)
        print('past step 1...enetering sliding window')

        try:
            image_batches_1 = []
            image_batches_2 = []

            while frames_max+1<len(batch_1_frames):
                img1_batch = torch.stack([batch_1_frames[frames_min], batch_1_frames[frames_max]])
                img2_batch = torch.stack([batch_1_frames[frames_min+1], batch_1_frames[frames_max+1]])
                image_batches_1.append(img1_batch)
                image_batches_2.append(img2_batch)
                frames_min+=1
                frames_max+=1

            image_batches_1=[batch.permute(0,3,1,2) for batch in image_batches_1]
            image_batches_2=[batch.permute(0,3,1,2) for batch in image_batches_2]

            test_1=np.concatenate(image_batches_1)
            test_2 = np.concatenate(image_batches_2)

            test_1=torch.tensor(test_1)
            test_2=torch.tensor(test_2)
            print('images returned')
        except Exception as e:
            print(f"An error occurred: {e}")


        return test_1, test_2


    @staticmethod
    def preprocess(raft_weights, img1_batch, img2_batch):
        weights = raft_weights
        transforms = weights.transforms()
        img1_batch = F.resize(img1_batch, size=[256, 328], antialias=False)
        img2_batch = F.resize(img2_batch, size=[256, 328], antialias=False)
        return transforms(img1_batch, img2_batch)
    
    def calcOpticalFlow(self):
        try:
            flows = []
            print('preparing images')
            test_1, test_2 = self.prepare_image_batches(0, self.batch_size)
            end=self.batch_size
            start=0
            torch.mps.empty_cache()

            # We have enough frames for a batch, process it
            while end < len(test_1)+1:
                print('Processing batches')
                try:
                    torch.mps.empty_cache()
                    img1_batch, img2_batch = VideoProcessing.preprocess(Raft_Small_Weights.DEFAULT, test_1[start:end], test_2[start+1:end+1])
                    with torch.no_grad():
                        list_of_flows = self.model(img1_batch.to(self.device), img2_batch.to(self.device))
                except Exception as e:
                    print(f"An error occurred: {e}")
                print('Model fitted')
                del img1_batch, img2_batch
                torch.mps.empty_cache()
                predicted_flow = list_of_flows[-1]
                del list_of_flows
                print(f'{predicted_flow.shape}')
                im_flow=predicted_flow[0]
                del predicted_flow
                flow_img = flow_to_image(im_flow).to("cpu").permute(1,2,0).numpy()
                start+=self.batch_size
                end+=self.batch_size
                flows.append(flow_img)
            return flows
                # _, jpeg = cv2.imencode('.jpg', flow_img)
                # yield jpeg.tobytes()
        except Exception as e:
            print(f"An error occurred: {e}")
