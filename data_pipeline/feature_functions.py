import numpy as np
from scipy import signal
from scipy.sparse import csr_matrix
from scipy.sparse.csgraph import connected_components
import sys
from training_set_building.app_training_set.grid_utils import Utils
g_utils = Utils()

class PreProcessing(object):

    def getGridandTrajectories(self, flows):
        grid = g_utils.devlop_grid_points(flows, grid_size=8, max_length=15, drift_threshold=10)
        trajectories = g_utils.process_trajectory_vectors(grid)

        return grid, trajectories
    
    ## Using Principles from signal processing we can calculate the similarity between the phasic patterns
    # of two trajectories allowing us to cluster them and isolate the subsequent processing on a smaller 
    # image scale which can both reduce noise and speed up processing 
    def compute_phase_difference(self, traj1, traj2):
        phase1 = np.arctan2(traj1[..., 1], traj1[..., 0])
        phase2 = np.arctan2(traj2[..., 1], traj2[..., 0])

        phasediff = np.abs(phase1 - phase2)
        return phasediff
    
    #Threshold can change, for now 8 seems to produce reasnable results
    # Higher threshold means more similar trajectories and less clusters
    # Lower threshold means more strict boundaries and less similar trajectories--> More labels and more clusters
    def phase_based_similarity_score(self, data, threshold=5):
        n_samples, n_y, n_x = data.shape[0], data.shape[1], data.shape[2]
        num_points = n_x * n_y
        matrix = np.zeros((num_points, num_points))
        # reshaped_data = data.reshape(n_samples, num_points, 2)

        # data_i = data.reshape(n_samples, 1, num_points, 2)
        # data_j = data.reshape(n_samples, num_points, 1, 2)

        # phase_diff = self.compute_phase_difference(data_i, data_j)

        # matrix = np.mean(phase_diff < np.radians(threshold), axis=0)

        for i in range(num_points):
            for j in range(num_points):
                i_x, i_y = divmod(i, data.shape[2]) 
                j_x, j_y = divmod(j, data.shape[2])

                phase_diff = self.compute_phase_difference(data[:, i_x, i_y], data[:, j_x, j_y])

                sim_score = np.mean(phase_diff < np.radians(threshold))
                matrix[i,j] = sim_score

        return matrix
    
    def batch_phase_based_similarity_score(self, data, threshold=5, chunk_size=500):
        n_samples, n_x, n_y = data.shape[0], data.shape[1], data.shape[2]
        num_points = n_x * n_y
        matrix = np.zeros((num_points, num_points))

        data_full = data.reshape(n_samples, num_points, 2)

        for start in range(0, num_points, chunk_size):
            end = min(start + chunk_size, num_points)

            data_i = data_full[:, start:end].reshape(n_samples, end - start,1, 2)
            data_j = data_full.reshape(n_samples, 1, num_points, 2)

            phase_diff = self.compute_phase_difference(data_i, data_j)

            sim_scores_chunk = np.mean(phase_diff < np.radians(threshold), axis=0)

            matrix[start:end, :] = sim_scores_chunk
        
        return matrix
    
    def connected_graphs (self, matrix, threshold = 0.5):
        sparse_matrix = csr_matrix(matrix > threshold)
        n_components, labels = connected_components(sparse_matrix)

        return n_components, labels

    def calcFreqFeatures(self, trajectories):
        # Find Peaks must be run on a 1D array so a single grid point/trajectory must be selected
        concentric_y_peaks, _= signal.find_peaks(-trajectories[:,13,11,1], height=0.7, distance=5)
        eccentric_y_peaks, _= signal.find_peaks(trajectories[:,13,11,1], height=0.7, distance=5)
