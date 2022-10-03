import { useState } from 'react';

function Categories({ value, onClickCategory }) {
  const categories = [
    'Все',
    'Мясные',
    'Вегетерианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => {
          return (
            <li
              key={i}
              onClick={() => onClickCategory(i)}
              className={value === i ? 'active' : ''}
            >
              {categoryName}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
