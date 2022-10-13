import React from 'react';
import { useState } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import './scss/app.scss';
import Header from './components/Header';
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
          {' '}
          {/*это главнй елемент, который есть у всех вложенный в него елементов, на каком месте у него расположеы вложенные в него улементы? на том месте где в файле MainLayout написано Outlet, там и будут рендериться вложенные в него елементы, при совпадении урла с path*/}
          <Route path="" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
