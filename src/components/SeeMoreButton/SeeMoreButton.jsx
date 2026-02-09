// SeeMoreButton.jsx


import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './SeeMoreButton.module.scss'

const SeeMoreButton = () => {
  return (
    <div>
    <button className={`btn btn-primary ${styles.button}`}>See More</button>
    </div>
  );
}

export default SeeMoreButton;