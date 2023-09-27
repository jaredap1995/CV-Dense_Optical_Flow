import React from 'react';
import styles from './TwoColumn.module.scss';

type TwoColumnProps = {
  leftColumn: React.ReactNode;
  rightColumn: React.ReactNode;
  className?: string;
};

const TwoColumn = ({ leftColumn, rightColumn, className }: TwoColumnProps) => {


  return (
    <div className={`${styles.columnContainer}`}>
      <div className={className}>
        <div className={styles.leftColumn}>{leftColumn}</div>
        <div className={styles.rightColumn}>{rightColumn}</div>
      </div>
    </div>
  );
};

export default TwoColumn;
