import cv2
import numpy as np
import os
import matplotlib.pyplot as plt
import torch
from PIL import Image


class Utils:

    @staticmethod
    def group_paths(paths):
        grouped_paths = []
        current_group = [paths[0]]
        change_indexes = []

        for i in range(1, len(paths)):
            base_1 = os.path.basename(paths[i-1])
            base_2 = os.path.basename(paths[i])

            num_1 = int(base_1.split('.')[0][5:])
            num_2 = int(base_2.split('.')[0][5:])

            if abs(num_1 - num_2) > 1:
                grouped_paths.append(current_group)
                current_group = [paths[i]]
                change_indexes.append(i)
            
            else:
                current_group.append(paths[i])

        grouped_paths.append(current_group)
        return grouped_paths, change_indexes
    
    @staticmethod
    def split_frame_by_index(frames, indicies):
        split_list = []
        start_index = 0
        for index in indicies:
            split_list.append(frames[start_index:index])
            start_index = index
        split_list.append(frames[start_index:])

        return split_list

    def farkenbach_video_processing(self, frame_path, img_x, img_y):
        # Read frames from the directory
        frame_files = sorted(os.listdir(frame_path), key=lambda x: int(x[5:-4]))
        frames = [Image.open(os.path.join(frame_path, frame_file)) for frame_file in frame_files]
        paths = [os.path.join(frame_path, frame_file) for frame_file in frame_files]
        frames = [torch.tensor(np.array(frame)) for frame in frames]


        processed_frames = []
        # Read each frame and resize for faster processing (some multiple of 8 is appropriate...128,256)
        for frame in frames:
            frame = frame.numpy()
            frame=cv2.resize(frame, (img_x, img_y))
            print(frame.shape)
            processed_frames.append(frame)

        ############ Enter linees of code that break up the frames into specific repetitions based on breaks in the frames/paths ####

        # Will probably need to move this line to bottom and stack them all at end because I want to split repetitions based on breaks in the frames

        split_paths, indexes = self.group_paths(paths)
        split_frames = self.split_frame_by_index(processed_frames, indexes)


        mask = np.zeros_like(processed_frames[0])
        mask[..., 1] = 255

        flows=[]
        for repetition in split_frames:
            for i in range(len(repetition)-1):
                frame1 = repetition[i]
                frame2 = repetition[i+1]

                # Reordering the dimensions
                # frame1 = frame1.permute(0, 1, 2).numpy()
                # frame2 = frame2.permute(0, 1, 2).numpy()

                # frame1 = np.transpose(frame1, (0, 1, 2))
                # frame2 = np.transpose(frame2, (0, 1, 2))

                frame1 = cv2.cvtColor(frame1, cv2.COLOR_BGR2GRAY)
                frame2 = cv2.cvtColor(frame2, cv2.COLOR_BGR2GRAY)
                
                if len(flows) == 0:
                    flow = cv2.calcOpticalFlowFarneback(frame1, frame2, None, 0.5, 3, 100, 3, 7, 1.1, 0)
                else:
                    flow = cv2.calcOpticalFlowFarneback(frame1, frame2, None, 0.5, 3, 100, 3, 7, 1.1, 0)
                
                # The output flow is a 2-channel array with optical flow vectors, (u, v)
                # We can compute their magnitude and direction and visualize them
                
                #####Uncomment the code in this segment below and change flows.append to `(rgb)` to append the 3 channel color`

                # magnitude, direction = cv2.cartToPolar(flow[..., 0], flow[..., 1])

                # # Sets image hue according to the optical flow direction
                # mask[..., 0] = direction * 180 / np.pi / 2

                # # Sets image value according to the optical flow magnitude (normalized)
                # mask[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)

                # # Converts HSV to RGB (BGR) color representation
                # rgb = cv2.cvtColor(mask, cv2.COLOR_HSV2BGR)

                ############# End code to uncomment #############

                flows.append(flow)

        paths.pop()
        # reshaped_frames=torch.stack([torch.Tensor(flow) for flow in flows])

        return flows, paths, split_paths
    
    @staticmethod
    def plot_flows (flows, first_frame=0, end_frame=20):
        fig, axs = plt.subplots(4, 5, figsize=(20, 10))
        for i, ax in enumerate(axs.flatten()):
            ax.imshow(flows[i+first_frame])
            ax.set_title(f"Frame {i+first_frame}")
            if i+first_frame == end_frame:
                break
        plt.show()
    