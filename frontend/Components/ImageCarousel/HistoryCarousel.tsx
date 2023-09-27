import React from "react"
import styles from './HistoryCarousel.module.scss'
import CVHistory from "@/data/data"
import TwoColumn from "../TwoColumn/TwoColumn";
import Timeline from "../Timeline";
import { TransitionGroup, CSSTransition } from 'react-transition-group';

interface HistoryCarouselProps {
    items: typeof CVHistory;
    activeIndex: number;
}

const HistoryCarousel: React.FC<HistoryCarouselProps> = ({ items, activeIndex }) => {

    const activeItem = items[activeIndex]

    return (
        <TransitionGroup>
            <CSSTransition
                key={activeIndex}
                timeout={{ enter: 1000, exit: 500}}
                clasNames={styles}
            >
            <div className={`${styles.item} ${styles.active}`}>
                <Timeline item={activeItem} />
            </div>
            </CSSTransition>
        </TransitionGroup>
        
    )
}

export default HistoryCarousel;
