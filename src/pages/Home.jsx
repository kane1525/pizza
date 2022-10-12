import React from 'react';
import qs from 'qs';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import {
  setcategotyId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

const Home = () => {
  const navigate = useNavigate();
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);
  // console.log(items);
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setcategotyId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      // getPizzas();
    }
    // isMounted.current = true;
  }, []);

  const getPizzas = async () => {
    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&title=${searchValue}` : '';
    console.log('getPizzas отработал');

    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );

    window.scrollTo(0, 0);
  };

  // React.useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1));

  //     const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

  //     dispatch(
  //       setFilters({
  //         ...params,
  //         sort,
  //       })
  //     );
  //     // getPizzas();
  //   }
  //   // isMounted.current = true;
  // }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    // if (!window.location.search) {
    //   console.log(111);
    //   fetchPizzas(); // непонятно зачем тут это написано, и без этого работает так же, ТАК КАК ПИЦЦЫ ПОЛУЧАЮТСЯ С ПОМОЩЬЮ getPizzas со след useEffect даже при первой загрузке
    //   // что делает fetchPizzas?
    // }
  }, [categoryId, sortType, searchValue, currentPage]);

  useEffect(() => {
    getPizzas();
    // if (!isMounted.current) {
    //   isMounted.current = true;
    // }
    // что делает getPizzas? берет параметры из стейта фильтров и используя их генерирует запрос по своему шаблону (указанному в пиццаслайсе), получает конкертные пиццы, которые нужны и меняет стейт, что приводит к ререндеру страницы с нужными пиццами
  }, []);

  // ======= Вообще ниче не сделали, т.к строки не было в УРЛЕ

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
  // items - это массив с объектами
  // каждый объект в нем - это данные про пиццы, которые мы получили с бекенда после запроса createAsyncThunk
  // там будут лежать только те пиццы, которые нужно рендерить
  // мы их получили благодаря правильно динамически сформированному запросу на бекенд
  // и соотвественно теперь мы делаем для каждого такого объекта карточку на сайте и потом когда нам будет нужно, мы вставим эти карточки на наш сайт
  // мы получили масси с объектами тех пицц, которые нужно показать, теперь мы в этом массиве каждый отдельный объект с информацией передаем в наш строительный алгоритм pizzablock indes.jsx. Передаем по цепочке, и соотвественно там этот строительный шаблон принимает по одному объекту и для каждого нашего переданного объекта он сделает карточку видимую, которую можно будет показать на сайте и он сделает стольок карточек, сколько таких объектов будет в массииве, который мы мапим, и все эти карточки поместятся в переменную pizzas
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
