import numpy as np

class Utils:

    @staticmethod
    def devlop_grid_points(flow_batch, grid_size=8, max_length=15, drift_threshold=10):
        #Takes in inputs that have been reshaped by 
        W, H = flow_batch.shape[2], flow_batch.shape[1]
        start_points = np.mgrid[grid_size//2:H:grid_size, grid_size//2:W:grid_size].transpose(1,2,0)
        start_points = np.minimum(start_points, np.array([H-1, W-1]))

        trajectories = []
        trajectory_lengths = np.zeros_like(start_points[..., 0])
        trajectory_starts = np.copy(start_points)

        # Iterate over frames in batch
        for i in range(flow_batch.shape[0]):
            # Update points
            points = start_points + flow_batch[i, start_points[:, :, 0].astype(int), start_points[:, :, 1].astype(int)]

            # Check for trajectories that have reached their maximum length
            max_length_mask = trajectory_lengths >= max_length
            points[max_length_mask] = trajectory_starts[max_length_mask]
            trajectory_lengths[max_length_mask] = 0

            # Check for trajectories that have drifted too far
            drift_mask = np.linalg.norm(points - trajectory_starts, axis=-1) > drift_threshold
            points[drift_mask] = trajectory_starts[drift_mask]
            trajectory_lengths[drift_mask] = 0

            # Store the updated points
            trajectories.append(points)

            # Increment the lengths of the trajectories
            trajectory_lengths += 1

        return trajectories
    

    @staticmethod
    def process_trajectory_vectors(trajectories):
        displacements = np.diff(trajectories, axis=0)

        # Compute the magnitudes of the displacement vectors
        magnitudes = np.linalg.norm(displacements, axis=-1)

        # Create empty array to store the normalized vectors and filtered vectors
        filtered_vectors = np.full_like(trajectories, None)
        filtered_vectors = np.delete(filtered_vectors, 0, axis=0)

        # Iterate over all grid points
        for i in range(displacements.shape[1]):
            for j in range(displacements.shape[2]):
                # Normalize the magnitudes
                sum_of_magnitudes = np.sum(magnitudes[:, i, j])
                if sum_of_magnitudes == 0:  # Avoid division by zero
                    sum_of_magnitudes = 1
                norm_vector = displacements[:, i, j] / sum_of_magnitudes

                # Prune static and erratic trajectories
                if np.any(np.abs(norm_vector) <= 0.7):
                    filtered_vectors[:, i, j] = norm_vector

        return filtered_vectors*10
