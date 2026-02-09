// HomePageSection.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePageSection.module.scss';

const HomePageSection = ({ imageUrl, buttonText, buttonLink, buttonPosition }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(buttonLink);
  };

  return (
    <div className={styles.container} style={{ backgroundImage: `url(${imageUrl})` }}>
      <div className={`${styles.buttonContainer} ${styles[buttonPosition]}`}>
        <button className={styles.button} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default HomePageSection;
