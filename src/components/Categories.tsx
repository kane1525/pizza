import React from 'react';
import { useWhyDidYouUpdate } from 'ahooks';

type CategoriesProps = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетерианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ value, onClickCategory }) => {
    useWhyDidYouUpdate('Categories', { value, onClickCategory });
    // в компоненте, который хотим узнать почему перерисовывается длеаем такую строчку
    // в аршгументах указываем 1- название компонента, 2 - агрументы, которые этот компонент принимает
    // заходим в констль и сморим что не так
    // useWhyDidYouUpdateпоказывает что компонент меняется изза переданных пропсов, но если компонент ререндерится изза родителя, useWhyDidYouUpdateпоказывает этого не покажет

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
);
// без реакт мемо, когда у нашего родителя поменялся стейт, за которым следит родитель, то родитель будет перерисован и все дочерние компоненты так же будут перерисованы
// если же мы используем мемо, когда у нашего родительского елемента изменится стейт и он захочет перерисоваться, он будет игнорировать тот елем ент, который использует мемо
// => в данном случае при перерисовке home, мы с помощью мемо сказали, что наши котегории не нужно перерисоввывать

export default Categories;
