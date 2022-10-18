import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  setSort,
  SortPropertyEnum,
  sortSelector,
  Sort,
} from '../redux/slices/filterSlice';

// type SortItem = {
//   name: string;
//   sortProperty: SortPropertyEnum;
// };

type PopupClick = MouseEvent & {
  path: Node[];
};

export const list: Sort[] = [
  // 4 связь типов
  { name: 'Популярности', sortProperty: SortPropertyEnum.RATING_DESC },
  { name: '-Популярности', sortProperty: SortPropertyEnum.RATING_ASC },
  { name: 'Цене', sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: '-Цене', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'Алфавиту', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: '-Алфавиту', sortProperty: SortPropertyEnum.TITLE_ASC },
];

function SortPopup() {
  const dispatch = useDispatch();
  const { name, sortProperty } = useSelector(sortSelector);
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);

  const onClickListItem = (obj: Sort) => {
    // 4 связь типов
    dispatch(setSort(obj));
    setIsVisible(false);
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _e = e as PopupClick;
      if (sortRef.current && !_e.path.includes(sortRef.current)) {
        setIsVisible(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={sortRef} className="sort">
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span
          onMouseEnter={() => setIsVisible(true)}
          // onMouseLeave={() => setIsVisible(false)}
        >
          {name}
        </span>
      </div>
      {isVisible && (
        <div onMouseLeave={() => setIsVisible(false)} className="sort__popup">
          <ul>
            {list.map((obj, i) => (
              <li
                key={i}
                className={sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => onClickListItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SortPopup;