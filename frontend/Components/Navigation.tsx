import React, { useEffect } from "react";
import styles from './Navigation.module.scss';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState } from 'react'


const LOGO = '/logo/logo2.png';


const Navigation = () => {
    const router = useRouter();

    const aboutEvent = router.pathname === '/' ? "#about" : '/#about';

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY>50){
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    return (
        <header className={ `${styles.header} ${isScrolled ? styles.scrolled: ''}`}>

                <Link className={styles.logo} href="/">
                        <Image 
                            src={LOGO}
                            height="100"
                            width="100"
                            alt="website logo"
                        />
                </Link>

                <nav>
                    <ul className={styles.menu}>
                        <li>
                            <Link href={aboutEvent}>
                                About
                            </Link>
                            {/* Add sub-menu items here */}
                        </li>
                        <li>
                            <Link href="/history">
                                History
                            </Link>
                            {/* Add sub-menu items here */}
                        </li>
                        <li>
                            <Link href="/team">
                                Team
                            </Link>
                            {/* Add sub-menu items here */}
                        </li>
                    </ul>
                </nav>

                <div className={`${styles.actionButtons}`}>
                        <Link className={`${styles.fullSizeLink} ${styles.shimmerEffect}`} href="/app">
                            Demo 
                        </Link>
                </div>
        </header>
    );
};

export default Navigation;
