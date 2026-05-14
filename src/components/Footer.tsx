import React from 'react';
import styles from './Footer.module.css';
import { useThemeStore } from '../zustand/useThemeStore';

const Footer: React.FC = () => {
  const { isDarkMode } = useThemeStore();

  return (
    <footer className={`mt-0 p-4 border-t border-gray-800 ${ isDarkMode ? 'bg-gray-900' : 'bg-white' } transition-colors`}>
      <p className={styles.copyrightText}>
        &copy; {new Date().getFullYear()} <span className={styles.brandName}>Filmxplorer</span>.
      </p>
    </footer>
  );
};

export default Footer;