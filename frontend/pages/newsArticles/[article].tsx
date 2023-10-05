import { useRouter } from 'next/router';
import articleData from "@/data/articles/articleData";
import styles from './[article].module.scss';
import React from 'react';

const newsViewer: React.FC = () => {
    const router = useRouter();
    const { article } = router.query;

    if (!article) {return <div>Loading...</div>}

    const data = articleData.find(item => item.slug === article)
    console.log(data)

function handleBackClick(event: { preventDefault: () => void; }) {
        event.preventDefault();
        window.history.back();
    }

const renderContent = (content: string) => {
    const regex = /\*\*(.*?)\*\*/g; 

    const paragraphs = content.split('/').filter(sentence => sentence.trim() !== '')

    const replaced = content.replace(regex, '<strong>$1</strong>')

    return (
        <>
            {paragraphs.map((sentence, index) => {
                const replacedSentence = sentence.trim().replace(regex, '<strong>$1</strong>');
                return (
                    <p key={index} dangerouslySetInnerHTML={{ __html: replacedSentence }} />
                );
            })}
        </>
    );
}

    return (
            <div className={styles.articleWrapper}>
                <div className={styles.imageContainer}>
                    <img src={data?.headerImageURL} className={styles.imageHeader}></img>
                </div>
                <div className={styles.contentContainer}>
                    {/* <a href="#" onClick={handleBackClick}>
                        <span className={styles.backButton}>
                            <svg viewBox="0 0 11 18" className="icon">
                                <path fill="currentColor" d="..."></path>
                            </svg>
                        </span>
                    </a> */}
                    <div className={styles.dateAndNews}>
                    <p> {data?.date} </p>
                    <p> | </p>
                    <p> <strong>{data?.brand} </strong></p>
                    </div>
                    <div className={styles.articleTitle}>
                        <p> {data?.Title}  </p>
                    </div>
                    <div className={styles.articleContent}>
                        {renderContent(data?.content || '')}
                    </div>
                    <div className={styles.footerContent}>
                        <div className={styles.footerText}>
                            <p>
                            Strength Vision is a technology leader specializing in advanced Computer Vision solutions for the modern era. Our systems, powered by AI, prioritize precision, reliability, and user experience. At Strength Vision, we envision a future where technology seamlessly integrates with human intuition and potential.
                            </p>
                            <p>
                            STRENGTH VISION and its logo are un-registered trademarks of the Strength Vision, Inc.
                            </p>
                        </div>
                        <div className={styles.footerLinks}>
                            ...Sharing Links Coming Soon
                        </div>
                    </div>
                </div>
            </div>  
    )
}

export default newsViewer;