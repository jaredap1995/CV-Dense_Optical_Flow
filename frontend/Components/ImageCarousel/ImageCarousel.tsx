import React from 'react';
import styles from '../ImageCarousel/ImageCarousel.module.scss'




interface ImageCarouselProps {
    images: string[];
    activeIndex: number; // Current displayed image index
  }
  
  const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, activeIndex }) => {
    return (
      <div className={styles.carouselContainer}>
        {images.map((imgSrc, index) => (
          <img 
            key={imgSrc}
            src={imgSrc}
            alt={`Carousel Image ${index}`}
            className={index === activeIndex ? styles.active : ''}
          />
        ))}
      </div>
    )
  }
  
  export default ImageCarousel;
  