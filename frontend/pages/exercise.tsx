'use client'

import { useState, useEffect } from 'react';
import styles from './exercise.module.scss'

const Exercises = () => {
    const [repCount, setRepCount] = useState(0);

    useEffect(() => {
        const fetchRepCount = () => {
            fetch('http://localhost:8000/api/rep_count')
            .then((response) => response.json())
            .then((data) => {
                setRepCount(data.rep_count);
            })
            .catch((error) => {
                console.log('Error fetching rep count: ', error);
            })
        }

        const intervalID = setInterval(fetchRepCount, 200)

        return () => clearInterval(intervalID)
    }, []);

    return (
        <div>
            <img src="http://127.0.0.1:8000/camera" className={styles.videoStream}/>
            <h1 className={styles.repCount}> Reps: {repCount}</h1>
        </div>
    )
}

export default Exercises;