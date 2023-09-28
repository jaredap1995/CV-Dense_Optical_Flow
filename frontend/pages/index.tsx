import React from 'react';
import styles from './index.module.scss';
import { useEffect } from 'react';
import $ from "jquery";

const LandingPage: React.FC = () => {


    useEffect(() => {
            $.ajax({
                url: 'https://player.vimeo.com/video/847717382?background=1&autoplay=1&loop=1&byline=0&title=0',
                type: 'GET',
                dataType: 'html',
                success: function(response: string) {
                    $('.vimeo-wrapper').html(response);
                },
                error: function(xhr: JQuery.jqXHR, status: string, error: string) {
                    console.log(xhr.responseText);
                }
            });

        },[]);

    return (
        <div className={styles.container}>

            {/* Full-Screen Hero Image */}
            <section className={styles.heroSection}>
                <img src="./sparse.gif" alt="Computer Vision" className={styles.heroImage} /> 
                <h1>Explore the History of Computer Vision in Exercise and Health</h1> {/*Change for later */}
                <p>Try out our new app and explore the evolution of computer vision in health and exercise.</p>
            </section>

            {/* Interactive Elements */}
            <section className={styles.interactiveSection}>
                        <article>
                        <h2>Real Time Velocity and Force Estimations</h2>
                        <ul>
                            <li className={styles.list}>Accurately identifies and analyzes your movements and the change in keypoint velocity across a live video stream</li>
                            <li className={styles.list}>Provides immediate feedback to autoregulate your exercises and terminate your sets.</li>
                            <li className={styles.list}> Work Smarter! Not Harder! </li>
                        </ul>
                        </article>
                        <img src="./optical_flow.gif" alt="Feature 1" />
            </section>

            {/* Parallax Section (This will require additional JS and CSS for the full effect) */}
            <section id='about' className={styles.aboutSection}>
                <div className={styles.parallaxContent}>
                    <h2>Discover Innovations</h2>
                    <p>Learn about the breakthroughs and innovations that have shaped the world of computer vision in health and exercise.</p>
                </div>
            </section>

            {/* Quick Links or Teasers */}
            <section className={styles.quickLinksSection}>
                <div className={styles.linkItem}>
                    <h2>About Us</h2>
                    <p>Learn more about our mission, vision, and journey.</p>
                </div>
                {/* Add more items as needed */}
            </section>

            {/* Newsletter Signup */}
            <section className={styles.newsletterSection}>
                <h2 className={styles.innerText}> Stay Updated!</h2>
                <p className={styles.innerText}> Subscribe to our newsletter to get the latest updates.</p>
                <form>
                    <input type="email" placeholder="Your email address" />
                    <button type="submit">Subscribe</button>
                </form>
            </section>

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
