import React from 'react';
import Navigation from './Navigation';
import styles from './layout.module.scss';
import { useRouter } from 'next/router';


interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { route } = useRouter();

  return (
    <>
    <Navigation />
      <div className={styles.main}>{children}</div>
    </>
  );
};

export default Layout;
