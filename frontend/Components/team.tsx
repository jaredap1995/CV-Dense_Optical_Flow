import React, {useState, useEffect, useRef, CSSProperties} from "react";
import styles from './team.module.scss'
import employeeData from '../data/employeeData/employeeData';
import Link from "next/link";
import employee from "@/pages/team/[employee]";


function FadeInSection(props: { children: React.ReactNode }) {
    const [opacityValue, setOpacityValue] = useState<number>(0);
    const domRef = useRef<HTMLDivElement>(null);


    React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setOpacityValue(entry.intersectionRatio));
        }, {
            threshold: Array.from({length: 101}, (_, i) => i/100)
        });
        if (domRef.current) {
            observer.observe(domRef.current);
        }
        return () => {
            if (domRef.current) {
                observer.unobserve(domRef.current);
            }
        };
    }, []);

    const defaultStyle: CSSProperties = {
        opacity: opacityValue,
        visibility: opacityValue > 0 ? 'visible': 'hidden',
        transition: 'opacity 0.8s ease-out',
    };

    return (
            <div
                ref={domRef}
                style={defaultStyle}
            >
                {props.children}
            </div>
    );
}

  

const team: React.FC = () => {

    const [index, setIndex] = useState<number | null>(null);
    const [isBioVisible, setIsBioVisible] = useState(false);


    const bioToggle = () => {
        setIsBioVisible(!isBioVisible);
        if (!isBioVisible){
            document.body.style.overflow = 'hidden';
        } else { 
            document.body.style.overflow = 'auto';
        }
    };

    useEffect(() => {
        const start = Math.floor(Math.random() * employeeData.length);
        setIndex(start);

        setTimeout(() => {
            const position = start * window.innerHeight;
            window.scrollTo(0, position);
        }, 100);
    }, []);

    
    const defaultBioStyle: CSSProperties = {
        opacity: 0,
        visibility: 'hidden',
        position: 'absolute',
    }

    const visibleBioStyle: CSSProperties = {
        opacity: 1,
        visibility: 'visible',
        position: 'relative',
        color: 'white',
        transition: 'opacity 0.8s ease-out, visibility 0.8s ease-out',
    }

    if (index == null) {
        return <div>Loading...</div>;
    }

    

    return (
        <div className={`${styles.mainContainer}`}>
            {employeeData.map((employee, i) => (
                <FadeInSection key={i}>
            <div
                className={`${styles.centerContainer}`} 
            >
                <div className={styles.employeeImage}>
                    <img src={employee.image} alt={employee.name} />
                </div>
                <div className={`${styles.employeeDescription} ${isBioVisible ? 'bioVisible' : ''}`}
                    style={isBioVisible ? {paddingTop: '100px'}: {}}
                >
                    <div className={styles.isStrongName}>
                        {employee.name.split(' ')[0]} is Strong
                    </div>
                    <div className={styles.nameAndTitle}>
                        {employee.name}, {employee.position}
                    </div>
                    <div className={styles.shortDescription}>
                        <p>{employee.description}</p>
                    </div>

                    {/* Toggle Button */}
                    <button
                        className={styles.expandButton}
                        onClick={bioToggle}
                        style={{ display: isBioVisible ? 'none': 'block' }}
                    > 
                        Learn More About {employee.name.split(' ')[0]}
                    </button>

                    {/* Full Bio */}
                    <div className={`${styles.fullBio}`} 
                     style={isBioVisible ? {...defaultBioStyle, ...visibleBioStyle, display: 'flex'} : defaultBioStyle}>
                        {employee.bio}
                    </div>

                    <button className={styles.closeButton} onClick={bioToggle} style={{ display: isBioVisible ? 'block' : 'none' }}>
                        Close bio
                    </button>
                </div>
            </div>  
            </FadeInSection>               
        ))}
    </div>
    );
}; 

export default team;
