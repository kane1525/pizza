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
  // console.log('1 отрисовали хоум');
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filter
  );
  const { items, status } = useSelector((state) => state.pizzas);
  console.log(items);
  // const { sortProperty: sortType } = useSelector((state) => state.filter.sort);
  const sortType = sort.sortProperty;

  const { searchValue } = React.useContext(SearchContext);

  const dispatch = useDispatch();

  const onChangeCategory = (id) => {
    dispatch(setcategotyId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const getPizzas = async () => {
    // setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&title=${searchValue}` : '';

    // await axios
    //   .get(
    //     `https://63382940937ea77bfdbb5eea.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
    //   )
    //   .then((res) => {
    //     setItems(res.data);
    //     setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     setIsLoading(false)
    //   })

    // try {
    dispatch(
      fetchPizzas({
        order,
        sortBy,
        category,
        search,
        currentPage,
      })
    );
    // } catch (error) {
    //   console.log(error);
    // }
    //  finally {
    //   setIsLoading(false);
    // }
    // теперь нам не нужен трай кетч, так как все ошибки мы обрабатываем в пицца слайсе

    window.scrollTo(0, 0);
  };

  // При первом рендере и так же если изменится одна из переменных categoryId, sortType, currentPage
  React.useEffect(() => {
    // console.log('2 проверили, был ли этот компонент отрисован до этого');
    if (isMounted.current) {
      // проверяем, был ли этот компонент (Home) уже на странице, или сейчас рендерится первый раз. Если уже был, выполняем код в фигурных скобках, если монтируется в первый раз, тогда не выполняем код со скобок, а только меняем флаг isMounted
      const queryString = qs.stringify({
        // этот код, если наш home уже был отрендерен до этого и поменялось одно из значени в стейте, он вшивает строку в строку URL, если же компонент рендерится впервые, в URL строке будет только наш домен без остальных фильтров.
        sortProperty: sortType,
        categoryId,
        currentPage,
      });
      // console.log('узнали, что это уже не первая отрисовка');
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  // ======= Посмотрели что еще не был монтирован, поменяли флаг и пошли дальше

  //  Только при первом рендере
  React.useEffect(() => {
    if (window.location.search) {
      // проверяем есть ли в строке кроме названия магазина какие то параметры для фильтрации, если есть выполняем след действия
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true; // то что мы тут поставили тру гарантирует нам, что при первой загрузке сайта после того как мы поменяли стейт и нашли нужные нам пиццы больше не будет запускаться ф-ция из след юзеффекта fetchPizza со строки 106 (только на время первой загрузки)
      // console.log(
      //   '3 посмотрели было ли что то в адресной строке, если да, поменяли стейт'
      // );
    }
  }, []);

  // ======= Вообще ниче не сделали, т.к строки не было в УРЛЕ

  // если был первый рендер, запрашиваем пиццы
  useEffect(() => {
    window.scrollTo(0, 0);
    // console.log('4 поменяли изсерч на фолс');
    if (!isSearch.current) {
      // если при первой загрузке предидущий юзеффект отработал, этот фетч пока не отрабатывает, а только подготовливаем флаг isSearch для последующих действий, и когда будут происходить в след раз изменения на этом сайте, предидущий юзеффект уже отрабатывать не будет, а будет отрабатывать этот fetchPizzas
      // console.log('5 запросили нужные нам пиццы');
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />);
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
