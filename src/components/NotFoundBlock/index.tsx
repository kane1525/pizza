import React from 'react';
import { Link } from 'react-router-dom';

import styles from './NotFoundBlock.module.scss';

const NotFoundBlock: React.FC = () => {
  return (
    <div className={styles.root}>
      <h1>
        <span>😑</span>
        <br />
        Нічого не знайдено
      </h1>
      <p className={styles.description}>
        Нажаль така сторінка відсутня в нашому магазині
      </p>
      <Link className={`${styles.buttonBlack} button`} to="/">
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFoundBlock;
