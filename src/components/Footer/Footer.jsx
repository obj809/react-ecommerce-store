// Footer.jsx

import React from 'react';
import styles from './Footer.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithubSquare, faTwitterSquare, faInstagramSquare, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Summit Shop</p>
      <div className={styles.icons}>
        <a href="https://github.com/cyberforge1" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithubSquare} className={styles.icon} />
        </a>
        <a href="https://www.linkedin.com/in/obj809/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className={styles.icon} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagramSquare} className={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
