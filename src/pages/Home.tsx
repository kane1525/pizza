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
import {
  filterStateSelector,
  setcategotyId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import {
  fetchPizzas,
  pizzasStateSelector,
  SearchPizzaParams,
} from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';
import { FilterSliceState } from '../redux/slices/filterSlice';
import { nanoid } from '@reduxjs/toolkit';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(filterStateSelector);
  const { items, status } = useSelector(pizzasStateSelector);
  const sortType = sort.sortProperty;

  const dispatch = useAppDispatch();

  const onChangeCategory = (idx: number) => {
    dispatch(setcategotyId(idx));
  };

  const onChangePage = (page: number) => {
    dispatch({
      type: 123,
      entyties: [1, 2, 3, 4],
    });
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
      //2 Связь типов
      // 2 в этом месте мы подстраиваемся под шаблон type SearchPizzaParams Почему?
      // потому что там где мы создавали эту ф-цию, мы написали у нее в пропсах, что эти пропсы должны подходить под шаблон SearchPizzaParams
      // и теперь везде, где мы хотим использовать эту ф-цию, мы должны передать ей пропсы что б они обязательно подходили под такой шаблон
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)); // тут было ддописано текст as unknown as SearchPizzaParams
      // наша константа params  если по честному не подходит под шаблон SearchPizzaParams, но пусть компьютер думает, что подходит

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      // if (typeof params.search === 'string') {
      // было без этого иф!!!
      dispatch(
        setFilters({
          // 5 связь типов
          // ...params,
          searchValue: '', //params.search,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort || list[0],
        })
        // объект, который мы передаем в setFilters обяязательно должен соотвествовать шаблону FilterSliceState Почему?
        // Потому что в фильтерслайсе там где мы создавали екшн setFilters мы указали, что его пейлоад должен быть FilterSliceState
        // соотвественно везде, где мы будем выполнять наш екшн setFilters мы должны позаботиться что б пейлоад соотвествовал FilterSliceState
      );
      isSearch.current = true;
    }
    // }
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    if (!isSearch.current) {
      // пишем так потому что isSearch создан с помощью useRef и что б обратиться к значению, которое мы установили, неужно писать не просто isSearch, а isSearch.current
      getPizzas();
    }
    isSearch.current = false;
    isMounted.current = true;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj: any) => <PizzaBlock {...obj} />);
  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'rejected' ? (
        <div className="content__error-info">
          {' '}
          <h2>
            Error ocured <span>😕</span>
          </h2>
          <p>
            Unfortunately we can not fetch pizzas
            <br />
            Для того, чтобы заказать пиццу, перейди на главную страницу.
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

// если мы хотим в зависимости от того что у нас в адресной строчке рендерить что то, мы используем useLocation
// хук useLocation дает нам понять что адресная строка перерисовалась, и на том компоненте на котором он используется нужно сделать перерисовку

// хук юзпарамс позволяет взять какие то динамические данные с урл строки и использовать их в другом месте, например в запросе

// статические параметры, те которые без : указываются в роутах, можно вытащить с помощью window.location.search или же с помощью роутер дом хука useSearchParams
// или же в с помощью хука useLocation, внутри того что он возвращает будет свойство search

// Если у нас есть задача что б некоторые части сайта оставались статичными, а другие менялись, мы можем использовать outlet
