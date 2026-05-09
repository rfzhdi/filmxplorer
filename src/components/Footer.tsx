import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footerContainer}>
      <p className={styles.copyrightText}>
        &copy; {new Date().getFullYear()} <span className={styles.brandName}>Filmxplorer</span>.
      </p>
    </footer>
  );
};

export default Footer;