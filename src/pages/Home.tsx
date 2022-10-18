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
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, pizzasStateSelector } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

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
    );

    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
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
