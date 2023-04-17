import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './scss/app.scss';
import Home from './pages/Home';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import NotFound from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
