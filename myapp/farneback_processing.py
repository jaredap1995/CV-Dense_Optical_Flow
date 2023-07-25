import cv2
import numpy as np

class FarnebackProcessing(object):
    def __init__(self):
        self.old_frame = None
        self.old_gray = None
        self.mask = None
        self.img_h=256
        self.img_w=328


    def live_farneback_flow(self, gray, old_gray, mask):
        flow = cv2.calcOpticalFlowFarneback(old_gray, gray, None, 0.5, 3, 100, 3, 7, 1.1, 0)
        magnitude, direction = cv2.cartToPolar(flow[..., 0], flow[..., 1])

        # Sets image hue according to the optical flow direction
        mask[..., 0] = direction * 180 / np.pi / 2
        # Sets image value according to the optical flow magnitude (normalized)
        mask[..., 2] = cv2.normalize(magnitude, None, 0, 255, cv2.NORM_MINMAX)
        # Converts HSV to RGB (BGR) color representation
        rgb = cv2.cvtColor(mask, cv2.COLOR_HSV2BGR)

        return rgb
    
    def image_farneback_flow(self, frame):
        frame = np.array(frame)
        frame = cv2.resize(frame, (self.img_h, self.img_w))

        if self.old_frame is None:
            self.old_frame = frame
            self.old_gray = cv2.cvtColor(self.old_frame, cv2.COLOR_BGR2GRAY)
            self.mask = np.zeros_like(frame)
            self.mask[..., 1] = 255
            return
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        rgb = self.live_farneback_flow(gray, self.old_gray, self.mask)

        self.old_frame = frame
        self.old_gray = gray

        _, jpeg = cv2.imencode('.jpg', rgb)
        image = jpeg.tobytes() 
        yield image

