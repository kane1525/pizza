import React from 'react';
import qs from 'qs';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';

import { useAppDispatch } from '../redux/store';
import { filterStateSelector } from '../redux/filter/selectors';
import {
  setcategotyId,
  setFilters,
  setCurrentPage,
} from '../redux/filter/slice';
import { pizzasStateSelector } from '../redux/pizza/selectors';
import { fetchPizzas } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterStateSelector);
  const { items, status } = useSelector(pizzasStateSelector);
  const sortType = sort.sortProperty;

  const dispatch = useAppDispatch();

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setcategotyId(idx));
  }, []); // говорим создайся при первом рендере, и потом, когда компонент будет перерисовываться, эту ф-цию пересоздавать не нужно

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&title=${searchValue}` : '';

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          searchValue: '',
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        })
      );
      isSearch.current = true;
    }
  }, []);
  // Якщо перша загрузка сторінки включає параметри пошуку

  useEffect(() => {
    if (isMounted.current) {
      console.log('2');
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
  }, [categoryId, sortType, searchValue, currentPage]);
  // Якщо вже було змаунчено і ми щось міняєио, міняємо також урлу

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);
  // На перший раз, якщо є серчпарамс не відпрацює
  // Всі останні рази при зміні параметрів пошуку відпрацює

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Всі піци</h2>
      {status === 'rejected' ? (
        <div className="content__error-info">
          <h2>
            Error ocured <span>😕</span>
          </h2>
          <p>
            Unfortunately we can not fetch pizzas
            <br />
            Щоб замовити піцу перейдіть на головну сторінку
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === 'pending' ? skeletons : pizzas}
        </div>
      )}

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
