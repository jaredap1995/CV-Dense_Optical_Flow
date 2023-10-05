import React from "react";
import articleData from '../data/articles/articleData';
import styles from './InteractiveTimeline.module.scss';
import Link from "next/link";


const InteractiveTimeline: React.FC = () => {

    const slugs = articleData.map(obj => obj.slug)

    return (
        <div className={styles.timelineContainer}>
            <div className={styles.timeline}>
            {articleData.map((item, index) => (
            <div key={index} className={styles.timelineEvent}>
                <div className={styles.eventDate}>
                    <div className={styles.textBox}>
                        <p>{item.date}</p>
                        <p> | </p>
                        <p>{item.brand}</p>
                    </div>
                    <div className={styles.textBox2}>
                        <p>{item.Title}</p>
                    </div>
                    <div>
                        <Link href={`/newsArticles/[article]`} as={`/newsArticles/${slugs[index]}`} className={styles.mediaLink}>
                            Read The Article
                        </Link>
                    </div>
                </div>
                <div className={styles.eventDetails}>
                    <img src={item.headerImageURL} alt={item.altText} />
                </div>
            </div>
        ))}
    </div>
</div>

    );
}

export default InteractiveTimeline;