// NavBar.jsx

import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faHeart, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from '/summit-shop-logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchForm from '../SearchForm/SearchForm';
import { subscribeToFavoritesCount, subscribeToCartCount } from '../../services/firebase-service';
import styles from './NavBar.module.scss';

const NavBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const unsubscribeFavorites = subscribeToFavoritesCount(setFavoritesCount);
    const unsubscribeCart = subscribeToCartCount(setCartCount);
    return () => {
      unsubscribeFavorites();
      unsubscribeCart();
    };
  }, []);

  const handleSearchIconClick = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const closeSearchForm = () => {
    setIsSearchOpen(false);
  };

  const linkStyles = ({ isActive }) =>
    isActive ? `nav-link ${styles.link} ${styles.link_active}` : `nav-link ${styles.link}`;

  return (
    <nav className={`navbar navbar-expand-lg navbar-light bg-light ${styles.nav}`}>
      <div className="container-fluid">
        <NavLink to="/" className={styles.titleContainer} style={{ textDecoration: 'none' }}>
          <img src={logo} alt="Summit Shop Logo" className={styles.logo} />
          <span className={styles.title}>Summit Shop</span>
        </NavLink>
        <div className={styles.navLinksContainer}>
          <div className={styles.navLinks}>
            <NavLink className={linkStyles} to="/products">
              All Products
            </NavLink>
            <NavLink className={linkStyles} to="/jackets-vests">
              Jackets & Vests
            </NavLink>
            <NavLink className={linkStyles} to="/tops">
              Tops
            </NavLink>
            <NavLink className={linkStyles} to="/bottoms">
              Bottoms
            </NavLink>
            <NavLink className={linkStyles} to="/accessories">
              Accessories
            </NavLink>
            <NavLink className={linkStyles} to="/equipment">
              Equipment
            </NavLink>
          </div>
        </div>
        <div className={styles.icons}>
          <FontAwesomeIcon icon={faSearch} className={`${styles.icon} fa-search`} onClick={handleSearchIconClick} />
          <NavLink to="/favorites" className={styles.iconLink}>
            <FontAwesomeIcon icon={faHeart} className={styles.icon} />
            {favoritesCount > 0 && <span className={styles.badge}>{favoritesCount}</span>}
          </NavLink>
          <NavLink to="/cart" className={styles.iconLink}>
            <FontAwesomeIcon icon={faShoppingCart} className={styles.icon} />
            {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </NavLink>
        </div>
      </div>
      {isSearchOpen && <SearchForm onClose={closeSearchForm} />}
    </nav>
  );
};

export default NavBar;
