import { useRouter } from 'next/router';
import styles from './article.module.scss'

const newsViewer: React.FC = () => {
    const router = useRouter();
    const { articleName } = router.query;

    if (!articleName) return null;

    return (
        <div className={styles.articleWrapper}>
            <div className={styles.imageContainer}>

            </div>
            <div className={styles.contentContainer}>
                <div className={styles.dateAndNews}>
                    {/* 30 June 2023 | Strength News */}
                </div>
                <div className={styles.articleTitle}>
                    {/* Article Title */}
                </div>
                <div className={styles.articleContent}>
                    {/* Article Content */}
                </div>
            </div>
            <div className={styles.articleFooter}>
                {/* Some footer Content
                
                */}

            </div>
        </div>
    )
}

export default newsViewer;