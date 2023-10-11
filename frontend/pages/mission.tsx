import React from "react";
import styles from './mission.module.scss'

const mission: React.FC = () => {

    const missionStatement = `We believe in pioneering computer vision techniques that transform human prosperity.

    Technology that enhances societal health, reduces crime, and minimizes stress.
    
    Solutions that help us understand ourselves better and foster a safer community.
    
    Experiences rooted in trust, where each revelation ushers in growth and harmony.
    
    Strength, driven by the vision that through innovative technology, we can pave the way for a healthier and safer society.`

    const sentences = missionStatement.split('.').filter(sentence => sentence.trim() !=='')

    return (
        <div className={styles.missionContainer}>
            <img className={styles.missionImage}></img>
            <div className={styles.missionStatementContainer}>
                <div className={styles.missionText}>
                {
                    sentences.map((sentence,index) => {
                        const words = sentence.trim().split(' ');
                        const boldWord = words[0];
                        const remainingWords = words.slice(1).join(' ');

                        return (
                            <p key={index}>
                                <span className={`${styles.boldWordStyle} ${styles.shimmerEffect}`}>{boldWord}</span> {remainingWords}.
                            </p>
                        )

                        })
                }
                </div>
            </div>
        </div>
    )
}

export default mission;