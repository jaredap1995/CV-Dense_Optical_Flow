import { useRouter } from 'next/router';
import articleData from "@/data/articles/articleData";
import styles from './[article].module.scss';
import CVHistory from '@/data/data';
import React from 'react';

const newsViewer: React.FC = () => {
    const router = useRouter();
    const { article } = router.query;

    if (!article) {return <div>Loading...</div>}

    const data = articleData.find(item => item.slug === article)

    return (
            <div className={styles.articleWrapper}>
                <div className={styles.imageContainer}>
                    <img></img>
                </div>
                <div className={styles.contentContainer}>
                    <div className={styles.dateAndNews}>
                        {/* 30 June 2023 | Strength News */}
                    </div>
                    <div className={styles.articleTitle}>
                        {data?.Title}
                    </div>
                    <div className={styles.articleContent}>
                        {data?.content}
                    </div>
                </div>
            </div>  
    )
}

export default newsViewer;