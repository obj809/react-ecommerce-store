// App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import FavoritesPage from './pages/FavoritesPage/FavoritesPage';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import CartPage from './pages/CartPage/CartPage';
import ProductLoader from './containers/ProductLoader/ProductLoader';
import JacketsAndVests from './pages/JacketsAndVests/JacketsAndVests';
import TopsPage from './pages/TopsPage/TopsPage';
import BottomsPage from './pages/BottomsPage/BottomsPage';
import AccessoriesPage from './pages/AccessoriesPage/AccessoriesPage';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import SearchResultsPage from './pages/SearchResultsPage/SearchResultsPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.module.scss';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<ProductsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductLoader />} />
          <Route path="/jackets-vests" element={<JacketsAndVests />} />
          <Route path="/tops" element={<TopsPage />} />
          <Route path="/bottoms" element={<BottomsPage />} />
          <Route path="/accessories" element={<AccessoriesPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
