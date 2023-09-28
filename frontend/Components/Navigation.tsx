import React from "react";
import styles from './Navigation.module.scss';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';

const LOGO = '/logo/jp_logo.png';

const Navigation = () => {
    const router = useRouter();

    const aboutEvent = router.pathname === '/' ? "#about" : '/#about';

    return (
        <header className={styles.header}>

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

                <div className={styles.actionButtons}>
                    <Link href="/app">
                        Demo 
                    </Link>
                </div>
        </header>
    );
};

export default Navigation;
