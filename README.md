# Exercise Movement Analysis using Dense Optical Flows

- This project aims to analyze exercise movements using dense optical flows calculated with the RAFT and Farneback algorithms. The analysis includes the development of motion trajectories, calculation of repetitions, and estimation of velocity and force responses.

- The project is still in preliminary development and will be updated as progress is made.

- ![RAFT of a Goblet Squat](./myapp/frames/output.png)


## Inspirations for the project:
- https://inria.hal.science/hal-00803241/file/IJCV.pdf
- https://arxiv.org/abs/2003.12039

## Project Outline

- **Dense Optical Flow Calculation:** Utilizes the RAFT and Farneback algorithms to calculate dense optical flows for exercise movements.
- **Motion Trajectories:** Develops motion trajectories from the calculated optical flows.
- **Repetition Calculation:** Uses the periodicity of motion trajectories and the color of flows to calculate repetitions.
- **Velocity Estimation:** Attempts to calculate velocity with respect to the dimensions of the video using a combination of optical flows and keypoints, and cuboid coordinates.
- **Force Response Estimation:** Uses the Force-velocity relationship to predict force responses.
- **Fatigue Prediction:** Estimates fatigue of resistance training based on the calculated force responses.
