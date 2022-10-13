import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const FullPizza = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pizza, setPizza] = useState();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://63382940937ea77bfdbb5eea.mockapi.io/items/' + id
        );
        setPizza(data);
      } catch (error) {
        alert('Fetch error');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  console.log(id);
  if (!pizza) {
    return '...загрузка';
  }
  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="1" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} p</h4>
    </div>
  );
};

export default FullPizza;
