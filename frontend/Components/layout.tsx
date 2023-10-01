import React from 'react';
import Navigation from './Navigation';
import styles from './layout.module.scss';
import { useRouter } from 'next/router';
import { PageTransition } from 'next-page-transitions';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { route } = useRouter();

  return (
    <>
    <Navigation />
    
    <PageTransition timeout={300} classNames="page-transition">
      <div className={styles.main}>{children}</div>
    </PageTransition>
    <style jsx global>
      {`
      .page-transition-enter {
        opacity: 0;
      }
      .page-transition-enter-active {
        opacity: 1;
        transition: opacity 500ms;
      }
      .page-transition-exit {
        opacity: 0;
      }
      .page-transition-exit-active {
        opacity: 0;
        transition: opacity 500ms;
      }`}
    </style>
    </>
  );
};

export default Layout;
