import React, { useState } from 'react';
import styles from './index.module.scss';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const LandingPage: React.FC = () => {

    const [currentH1, setCurrentH1] = useState(0);
    const h1Texts = ['Welcome to Strong', 'A New Frontier for Computer Vision and Human Behavior', 'Pure Human Machine Integration']

        useEffect(()=> {
            const interval = setInterval(() => {
                setCurrentH1((prevIndex) => (prevIndex+1) % h1Texts.length);
            },8000)

            return () => { clearInterval(interval)}
        }, [])

        useEffect(() => {
            AOS.init({
              duration: 800, 
            });
          }, []);

    const aboutText = `Beyond Vision - A New Reality: Strong's cutting-edge AI isn't just another tech tool; it's a guidepost to a smarter, safer, and healthier future.
    
    Revolutionizing Perception: From predicting structural collapses to physiological fatigue, embrace the power of computer vision that sees what the human eye can't.

    Crafting Certainty in an Uncertain World: Uncertainty isn't inevitable, with Strong's pioneering solutions, predict the unpredictable. 

    Clarity in Complexity: In our intricate world, Strong stands as a beacon, turning uncertainties into clear actionable insights.
    `

    const sentences = aboutText.split('.').filter(sentence => sentence.trim() !=='')

    return (
        <div className={styles.container}>

            <section className={styles.heroSection}>
                <img src="./gif_3.gif" alt="Computer Vision" className={styles.heroImage} /> 
                <div className={styles.centeredContainer}>
                    <h1 className={styles.h1Carousel}>{h1Texts[currentH1]}</h1>
                </div>
            </section>

            {/* Interactive Elements */}
            <section id='about' className={styles.interactiveSection}>
            {/* <h2 data-aos="fade-down"> Vision for The Modern World </h2> */}
                {
                    sentences.map((sentence,index) => {
                        const beginningText = sentence.trim().split(':');
                        const shimmerWord = beginningText[0];
                        const remainingWords =  beginningText.slice(1).join(' ');

                        return (
                            <div key={index}>
                                <h3 data-aos="fade-left" className={`${styles.bulletHeader} ${styles.shimmerEffect}`}>{shimmerWord}</h3> 
                                <p data-aos="fade-right" className={styles.bulletContent}>{remainingWords}.</p>
                            </div>
                        )                        
                    })
                }
                        {/* <article>
                            <ul>
                                <li data-aos="fade-right" className={styles.list}> Beyond Vision - A New Reality: Strong's cutting-edge AI isn't just another tech tool; it's your guidepost in a world craving actionable insights.</li>
                                <li data-aos="fade-right" className={styles.list}> Revolutionizing Perception: From predicting structural collapses to physiological fatigue, embrace the power of computer vision that sees what the human eye can't.</li>
                                <li data-aos="fade-right" className={styles.list}> Crafting Certainty in an Uncertain World: Uncertainty isn't inevitable. With Strong's pioneering solutions, predict the unpredictable. </li>
                            </ul>
                        </article> */}
                        {/* <img src="./sparse-vs-dense.gif" alt="Feature 1" /> */}
            </section>

            {/* Parallax Section /*n }
            <section className={styles.aboutSection}>
                <div className={styles.parallaxContent}>
                    <h2>Discover Innovations</h2>
                    <p>Learn about the breakthroughs and innovations that have shaped the world of computer vision in health and exercise.</p>
                </div>
            </section>

            {/* Newsletter Signup */}
            {/* <div className={styles.newsletterSection}>
                <h2 className={styles.innerText}> Stay Updated</h2>
                <p className={styles.innerText}> Subscribe to our newsletter to get the latest updates.</p>
                <form>
                    <input type="email" placeholder="Your email address" />
                    <button className={styles.shimmerEffect} type="submit">Subscribe</button>
                </form>
            </div> */}

            {/* Footer--->> Will add in layout */}
            {/* <footer className={styles.footer}>
                <div className={styles.footerContent}>
                    <p>© 2023 Computer Vision in Exercise and Health</p>
                    <div className={styles.socialLinks}>
                        {/* Add links to social media profiles */}
                        {/* <a href="#">Facebook</a>
                        <a href="#">Twitter</a> */}
                        {/* ... */}
                    {/* </div>
                </div>
            </footer> */} 

        </div>
    )
}

export default LandingPage;
