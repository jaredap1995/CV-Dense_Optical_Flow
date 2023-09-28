import dynamic from 'next/dynamic';
import styles from './history.module.scss'
import React from 'react';
import InteractiveTimeline from '@/Components/InteractiveTimeline';


const about: React.FC = () => {
    const header = 'History of Computer Vision in Exercise and Health' ;


    return (
            <div className={styles.container}>
                <h1 className={styles.header}>{header}</h1>
                <div className={styles.innerMain}>
                    <InteractiveTimeline />
                </div>            
            </div>
    )
}

export default about;