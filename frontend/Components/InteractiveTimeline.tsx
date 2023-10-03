import React from "react";
import CVHistory from "@/data/data";
import styles from './InteractiveTimeline.module.scss';
import Link from "next/link";
import slugify from 'slugify';


const InteractiveTimeline: React.FC = () => {

    const slugs = CVHistory.map(obj => slugify(obj.description))

    return (
        <div className={styles.timelineContainer}>
            <div className={styles.timeline}>
            {CVHistory.map((item, index) => (
            <div key={index} className={styles.timelineEvent}>
                <div className={styles.eventDate}>
                    <div className={styles.textBox}>
                        <p>{item.date}</p>
                        <p> | </p>
                        <p>{item.brand}</p>
                    </div>
                    <div className={styles.textBox2}>
                        <p>{item.description}</p>
                    </div>
                    <div>
                        <Link href={`/newsArticles/[article]`} as={`/newsArticles/${slugs[index]}`} className={styles.mediaLink}>
                            Read The Article
                        </Link>
                    </div>
                </div>
                <div className={styles.eventDetails}>
                    <img src={item.imageURL} alt={item.altText} />
                </div>
            </div>
        ))}
    </div>
</div>

    );
}

export default InteractiveTimeline;