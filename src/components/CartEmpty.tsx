import React from 'react';
import { Link } from 'react-router-dom';

import cartEmptyImg from '../assets/img/empty-cart.png';

const CartEmpty: React.FC = () => (
  <div className="cart cart--empty">
    <h2>
      Кошик пустий <span>😕</span>
    </h2>
    <p>
      Скоріш за все ви не замовили піцу
      <br />
      Для замовлення піци перейдіть на головну сторінку
    </p>
    <img src={cartEmptyImg} alt="Empty cart" />
    <Link className="button button--black" to="/">
      <span>Повернутися на головну</span>
    </Link>
  </div>
);

export default CartEmpty;
