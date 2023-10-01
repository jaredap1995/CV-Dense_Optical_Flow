import dynamic from 'next/dynamic';
import styles from './history.module.scss'
import React from 'react';
import InteractiveTimeline from '@/Components/InteractiveTimeline';


const about: React.FC = () => {

    return (
        <InteractiveTimeline />          
    )
}

export default about;