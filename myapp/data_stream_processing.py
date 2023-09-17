import numpy as np
from scipy.signal import savgol_filter

#An Exponential Moving Average Normalizer
class EMANormalizer:
    def __init__(self, alpha = 0.5):
        self.alpha = alpha
        self.current_ema = None

    def normalize(self, value):
        if self.current_ema is None:
            self.current_ema = value
        else:
            self.current_ema = self.alpha * value + (1 - self.alpha) * self.current_ema

        return self.current_ema
    

    
class ZScoreNormalizer:
    def __init__(self, buffer_size = 30):
        self.buffer = []
        self.buffer_size = buffer_size

    def normalize(self, value):
        self.buffer.append(value)
        if len(self.buffer) > self.buffer_size:
            self.buffer.pop(0)
        mean = np.mean(self.buffer)
        std = np.std(self.buffer)

        if std == 0:
            return 0
        
        return (value-mean)/std
    
class MinMaxScaler:
    def __init__(self, buffer_size = 30):
        self.buffer = []
        self.buffer_size = buffer_size

    def normalize(self, value):
        self.buffer.append(value)
        if len(self.buffer)>self.buffer_size:
            self.buffer.pop(0)

        min_val = np.min(self.buffer)
        max_val = np.max(self.buffer)

        if max_val == min_val:
            return 0
        
        return (value - min_val) / (max_val - min_val)

class SGFilter:
    def __init__(self, window_length = 5, polyorder = 2):
        self.window_length = window_length
        self.polyorder = polyorder

    
    def filter(self, data):
        return savgol_filter(data, self.window_length, self.polyorder)
    
class DynamicPeakThreshold:
    def __init__(self, windoew_size = 15, factor = 2.5):
        self.window_size = windoew_size
        self.factor = factor
        self.data_buffer = []

    def update(self, value):
        self.data_buffer.append(value)
        if len(self.data_buffer) > self.window_size:
            self.data_buffer.pop(0)
        
    def get_threshold(self):
        return self.factor * np.mean(self.data_buffer)