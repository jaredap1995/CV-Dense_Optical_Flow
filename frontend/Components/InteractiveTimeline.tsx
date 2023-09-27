import React from "react";
import CVHistory from "@/data/data";
import styles from './InteractiveTimeline.module.scss';
import { dot } from "node:test/reporters";


const InteractiveTimeline: React.FC = () => {


    const handleDotClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const dotElement = event.currentTarget;
        console.log(dotElement)
    
        dotElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    
        console.log('scrolled to: ', dotElement.getAttribute('data-index'));
    };
    
    

    return (
        <div className={styles.timelineContainer}>
            <div className={styles.timeline}>
                {CVHistory.map((item, index) => (
                    <div key={index} className={styles.timelineEvent}>
                    <button className={styles.dot} data-index={index} onClick={handleDotClick}></button>
                        <div className={styles.eventDetails}>
                            {item.description} <br></br><br></br>
                            <img src={item.imageURL} alt={item.altText}></img>
                        </div>
                        <div className={styles.eventDate}>
                            {item.date}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InteractiveTimeline;