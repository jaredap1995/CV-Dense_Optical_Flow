// Holds all Timeline Items. Component is main container for all timeline items

import React from "react";
import TimelineItem from "./TimelineItem";
import styles from './Timeline.module.scss';



interface TimelineItemData {
        key?: string
        date?: string;
        description: string;
        imageURL: string;
        altText: string;
}

interface TimelineProps {
    item: TimelineItemData
}

const Timeline: React.FC<TimelineProps> = ({ item }) => {
    return (
        <div className={styles.timeline}>
            <div className={styles.timelineContainer}>
                    <TimelineItem
                    date={String(item?.date)}
                    description={item?.description}
                    imageURL={item?.imageURL}
                    altText={item?.altText}
                    />
            </div>
        </div>
    )
}

export default Timeline;