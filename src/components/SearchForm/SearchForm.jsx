// SearchForm.jsx

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import styles from './SearchForm.module.scss';

const SearchForm = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const inputRef = useRef(null);

    // Focus the input as soon as the search bar opens, so the cursor is
    // blinking and ready for the user to type.
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Close the search bar (return to the normal header) on Escape.
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            navigate(`/search?query=${searchQuery}`);
            onClose();
        }
    };

    return (
        <div className={styles.searchFormContainer}>
            <form onSubmit={handleSearch} className={styles.searchForm}>
                <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className={styles.searchInput}
                />
                <button type="submit" className={styles.iconButton}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} fixedWidth />
                </button>
                <button type="button" onClick={onClose} className={styles.iconButton}>
                    <FontAwesomeIcon icon={faXmark} fixedWidth className={styles.closeIcon} />
                </button>
            </form>
        </div>
    );
};

export default SearchForm;
