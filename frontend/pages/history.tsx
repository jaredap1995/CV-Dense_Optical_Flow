import dynamic from 'next/dynamic';
import styles from './history.module.scss'
import React from 'react';
import InteractiveTimeline from '@/Components/InteractiveTimeline';


const about: React.FC = () => {
    const header = 'History of Computer Vision in Exercise and Health' ;
    // const [currentIndex, setCurrentIndex] = useState(0);
    // const [isVisible, setIsVisible] = useState(true);
    // const [isScrollLocked, setScrollLocked] = useState(false);
    // const containerRef = useRef<HTMLDivElement>(null);


    // const handleScroll = (e: Event) => {
    //         e.preventDefault();
    //         const delta = (e as WheelEvent).deltaY;
    
    
    //             if (delta > 0 && currentIndex < CVHistory.length - 1) {
    //                 setCurrentIndex((prev) => prev + 1);
    //             } else if (delta < 0 && currentIndex > 0) {
    //                 setCurrentIndex((prev) => prev - 1);
    //             }
    //             setIsVisible(true);
            
    
    //         console.log(currentIndex)
    //     };
    
    // useEffect(() => {
    //     containerRef.current?.addEventListener('wheel', handleScroll)

    //     return () => {
    //     containerRef.current?.removeEventListener('wheel', handleScroll)
    //     }
    // }, [currentIndex])


    return (
            <div className={styles.container}>
                <h1 className={styles.header}>{header}</h1>
                <div className={styles.innerMain}>
                    <InteractiveTimeline />
                </div>            
            </div>
    )
}

export default about;