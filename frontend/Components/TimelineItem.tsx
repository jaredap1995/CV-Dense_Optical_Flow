// Component for a single item

import React from 'react';
import styles from './TimelineItem.module.scss';

interface TimelineItemProp {
    date: string
    description: string
    imageURL?: string
    altText?: string
    className?: string
    currentIndex?: number
    itemIndex?: number
}


const TimelineItem: React.FC<TimelineItemProp> = ({ 
    date, 
    description,
    imageURL, 
    altText, 
    className,
    currentIndex,
    itemIndex }) => {

    return (
        <div className={`${styles.timelineItem}`}>
            <div className={styles.content}>
                <h2>{date}</h2>
                <div>{description}</div>
                <img src={imageURL} alt={altText}></img>
            </div>
        </div>
    )
}

export default TimelineItem;