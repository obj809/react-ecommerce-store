// FavoriteButton.jsx

import React, { useState, useEffect } from 'react';
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from '../../config/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import styles from './FavoriteButton.module.scss';

const FavoriteButton = ({ product, onFavoriteToggle }) => {
    const [isToggled, setIsToggled] = useState(product.favorited);

    useEffect(() => {
        const docRef = doc(db, "products", product.id);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                setIsToggled(doc.data().favorited);
            }
        });

        return () => unsubscribe();
    }, [product.id]);

    const toggle = async () => {
        const newFavorited = !isToggled;
        const docRef = doc(db, "products", product.id);
        await updateDoc(docRef, { favorited: newFavorited });
        setIsToggled(newFavorited);
        onFavoriteToggle(product.id, newFavorited);
    };

    return (
        <button onClick={toggle} className={`btn ${styles.button} ${isToggled ? styles.toggled : ''}`}>
            <FontAwesomeIcon icon={isToggled ? solidHeart : regularHeart} className="fa-2x" />
        </button>
    );
};

export default FavoriteButton;
