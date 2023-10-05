import React, {useState} from "react";
import styles from './index.module.scss'
import employeeData from '../../data/employeeData/employeeData';
import Link from "next/link";


const team: React.FC = () => {

    const [isVisbible, setIsVisible] = useState(false)

    const learnMoreClick = () => {
        setIsVisible(true);
        console.log(setIsVisible)
        document.body.classList.add('no-scroll')
    };

    const closeClick = () => {
        setIsVisible(false);
        document.body.classList.remove('no-scroll')
    }

    const index=0
    const profile = employeeData[index]
    const slugs = employeeData.map(employee => employee.slug)
    const firstName = profile.name.split(' ')[0]

    return (
        <div className={styles.mainContainer}>
            <div className={styles.centerContainer}>
                <div className={styles.employeeImage}>
                    <img src={profile.image}></img>
                </div>
                <div className={styles.employeeDescription}>
                    <div className={styles.isStrongName}> {firstName} is Strong</div>
                    <div className={styles.nameAndTitle}> {profile.name}, {profile.position}</div>
                    <p>{profile.description}</p>
                    <div className={styles.hiddenBio}>
                        <button className="learn-more" onClick={()=> learnMoreClick}>
                        Learn More About {profile.name}
                        </button>
                        <div className={styles.wholeBio}>
                            {profile.bio}
                        </div>
                        <button className="close" onClick={closeClick}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default team;