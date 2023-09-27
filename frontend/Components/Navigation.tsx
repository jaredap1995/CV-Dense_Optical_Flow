import React from "react";
import styles from './Navigation.module.scss';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';


const LOGO = '/logo/jp_logo.png';

const Navigation = () => {
    const router = useRouter();

    //Enter the routers and links for everything else

    return (
        <nav className={styles.navigation}>
        <Link passHref={true} href="/">
            <Image 
                className={styles.icon}
                src={LOGO}
                height="100"
                width="100"
                alt="website logo"
                />
        </Link>
        <h1 className={styles.header}>Workout Counter and Fatigue Predictor</h1>
        <ul>
            <li>
                <Link href = {"/history"} className={styles.navLink}>
                    Explore other Work
                </Link>
            </li>
        </ul>
        </nav>
    );
};

export default Navigation;

