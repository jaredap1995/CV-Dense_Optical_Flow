import numpy as np
from scipy import signal
from myapp.data_stream_processing import ZScoreNormalizer, MinMaxScaler, SGFilter, EMANormalizer, DynamicPeakThreshold
import pandas as pd
from scipy.signal import butter, filtfilt

class MotionAnalyzer:
    def __init__(self, H, W, grid_size=8, max_length=20, drift_threshold=15, mag_buffer_size=30):
        self.grid_size = grid_size
        self.max_length = max_length
        self.drift_threshold = drift_threshold
        
        # Initialization of start points
        self.start_points = np.mgrid[grid_size//2:H:grid_size, grid_size//2:W:grid_size].transpose(1,2,0)
        self.start_points = np.minimum(self.start_points, np.array([H-1, W-1]))
        
        # Store trajectory lengths and starts
        self.trajectory_lengths = np.zeros_like(self.start_points[..., 0])
        self.trajectory_starts = np.copy(self.start_points)

        self.previous_points = np.copy(self.start_points)

        self.trajectories = []
        self.grid_points = []
        self.points = None

        self.magnitude_buffer = np.zeros(mag_buffer_size)
        self.zscore_normalizer = ZScoreNormalizer()
        self.EMA_normalizer = EMANormalizer()
        self.min_max_scaler = MinMaxScaler()

    def analyze_frame(self, flow_frame):
        # Update points
        self.points = self.start_points + flow_frame[self.start_points[:, :, 0].astype(int), self.start_points[:, :, 1].astype(int)]

        # # Handle trajectories that have reached maximum length
        # max_length_mask = self.trajectory_lengths >= self.max_length
        # self.points[max_length_mask] = self.trajectory_starts[max_length_mask]
        # self.trajectory_lengths[max_length_mask] = 0

        # Handle drifted trajectories
        drift_mask = np.linalg.norm(self.points - self.trajectory_starts, axis=-1) > self.drift_threshold
        self.points[drift_mask] = self.trajectory_starts[drift_mask]
        self.trajectory_lengths[drift_mask] = 0

        # Increment trajectory lengths
        self.trajectory_lengths += 1

        self.grid_points.append(self.points)

        # Process and return the trajectories
        return self._process_trajectory_vectors(self.points)

    def _process_trajectory_vectors(self, trajectory):
        displacement = trajectory - self.previous_points
        self.previous_points = np.copy(self.points)

        ###### Trying Different classes from other file ##########
        normalized_displacement = self.EMA_normalizer.normalize(displacement)
        avg_displacement = np.mean(normalized_displacement, axis=(0,1))
        self.trajectories.append(avg_displacement)
        return avg_displacement


        ########## returns non-normalized trajectory... ##########
        norm_y_vector = displacement[:,:,1]
        norm_x_vector = displacement[:,:,0]
        avg_displacement = np.mean(displacement, axis=(0,1))
        self.trajectories.append(avg_displacement)
        return avg_displacement
        ########## works but leads to incosistent peak heights ##########

        ########## returns normalized trajectory...attempted with numpy ##########
        # magnitude = np.linalg.norm(displacement, axis=-1)

        # self.magnitude_buffer[:-1] = self.magnitude_buffer[1:]
        # self.magnitude_buffer[-1] = magnitude.mean()

        # avg_magnitude = self.magnitude_buffer.mean()
        # avg_magnitude = avg_magnitude if avg_magnitude != 0 else 1

        # norm_vector = displacement / avg_magnitude
        # self.trajectories.append(norm_vector)
        # return norm_vector
        ######################################################


        # sum_of_magnitudes = magnitude if magnitude.sum() != 0 else 1
        # # norm_vector = displacement / sum_of_magnitudes[..., np.newaxis]
        # norm_x_vector = norm_x_vector / sum_of_magnitudes
        # norm_y_vector = norm_y_vector / sum_of_magnitudes
        # norm_vector = np.stack((norm_x_vector, norm_y_vector), axis=2)

        # # Prune static and erratic trajectories
        # if np.any(np.abs(norm_vector) <= 0.7):
        #     self.trajectories.append(norm_vector)
        #     return norm_vector 
        # else:
        #     return None

    def reset(self):
        """Reset trajectories"""
        self.trajectory_lengths.fill(0)
        self.start_points = np.copy(self.trajectory_starts)

    def save_trajectories(self, filename1="trajectories.npy", filename2="grid_points.npy"):
        np.save(filename1, self.trajectories)
        np.save(filename2, self.grid_points)

class RealTimePeakAnalyzer:
    def __init__(self, buffer_size=15, memory_size = 5):
        self.buffer_size = buffer_size
        self.data_buffer = np.zeros(self.buffer_size)
        self.all_con_peaks = []
        self.all_ecc_peaks = []
        self.memory_size = memory_size
        self.recent_con_peaks = []
        self.recent_ecc_peaks = []
        self.rep_counter = 0
        self.processed_data_count = 0
        self.dynamic_tyhreshold = DynamicPeakThreshold()
        self.sgf = SGFilter()
        self.filtered_data = None
        self.smoothed_data = None

    def butter_highpass(self, data, cutoff, fs, order=2):
        nyq = 0.5 * fs
        normal_cutoff = cutoff/nyq
        print("this is this notmal cutoff: ", normal_cutoff)
        b, a = butter(order, normal_cutoff, btype='high', analog=False)
        y=filtfilt(b, a, data)
        return y
        
    def analyze(self, new_data_point, min_distance = 25):
        # if self.processed_data_count < self.buffer_size:
        #     self.processed_data_count += 1
        #     return None, None, None, None
        # else:
            # Shift the data in the buffer to make space for the new data point
            self.data_buffer[:-1] = self.data_buffer[1:]

            # Filter the data
            self.data_buffer = self.butter_highpass(self.data_buffer, cutoff = 10, fs = 30)

            self.data_buffer[-1] = new_data_point
            self.dynamic_tyhreshold.update(new_data_point)
            threshold = self.dynamic_tyhreshold.get_threshold()
            print('Peak Threshold: ', threshold)
            
            # Analyze peaks
            concentric_peaks, _ = signal.find_peaks(-self.data_buffer, height=abs(threshold), distance=min_distance, prominence=0.5*threshold)
            print('Concentric peaks: ', concentric_peaks, '\n')
            eccentric_peaks, _ = signal.find_peaks(self.data_buffer, height=abs(threshold), distance=min_distance, prominence=0.5*threshold)
            print('Eccentric peaks: ', eccentric_peaks, '\n')

            # Calculate the offset for absolute positioning
            offset = max(0, self.processed_data_count - self.buffer_size +1)
            
            concentric_peaks_abs = [peak + offset for peak in concentric_peaks]
            eccentric_peaks_abs = [peak + offset for peak in eccentric_peaks]

            # Filter the peaks that are too close to recent peaks
            concentric_peaks_abs = [p for p in concentric_peaks_abs if all(np.abs(p - rp) > min_distance for rp in self.recent_con_peaks)]
            eccentric_peaks_abs = [p for p in eccentric_peaks_abs if all(np.abs(p - rp) > min_distance for rp in self.recent_ecc_peaks)]
            
            print('Concentric peaks abs: ', concentric_peaks_abs, '\n')
            print('Eccentric peaks abs: ', eccentric_peaks_abs, '\n')

            # Update recent peaks
            self.recent_con_peaks = (self.recent_con_peaks + concentric_peaks_abs)[-self.memory_size:]
            self.recent_ecc_peaks = (self.recent_ecc_peaks + eccentric_peaks_abs)[-self.memory_size:]
            print('Recent peaks: ', self.recent_con_peaks, '\n')
            print('Recent peaks: ', self.recent_ecc_peaks, '\n')

            # Store peaks
            self.all_con_peaks.extend(concentric_peaks_abs)
            self.all_ecc_peaks.extend(eccentric_peaks_abs)

            # Increment repetition counter and processed data count
            if len(concentric_peaks_abs) > 0:
                self.rep_counter += 1
            print(f"Total Repetitions: {self.rep_counter}")

            self.processed_data_count += 1
            print(f"Processed data count: {self.processed_data_count}")

            return concentric_peaks, eccentric_peaks, concentric_peaks_abs, eccentric_peaks_abs

    def save_peaks(self, filename_concentric="concentric_peaks.npy", filename_eccentric="eccentric_peaks.npy"): 
        np.save(filename_concentric, self.all_con_peaks)
        np.save(filename_eccentric, self.all_ecc_peaks)
        # np.save(filename_concentric, self.recent_peaks)