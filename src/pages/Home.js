import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Product from '../components/Product';
import ImageGallery from '../components/ImageGallery';
import { topData, midData, botData } from '../utils/data';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <ImageGallery />
        <div className="home__rows">
          <div className="home__row">
            {topData.map((product, index) => {
              const { id, title, price, image, rating } = product;
              return (
                <Product
                  key={`${id}-${index}`}
                  id={id}
                  title={title}
                  price={price}
                  image={image}
                  rating={rating}
                />
              );
            })}
          </div>
          <div className="home__row">
            {midData.map((product, index) => {
              const { id, title, price, image, rating } = product;
              return (
                <Product
                  key={`${id}-${index}`}
                  id={id}
                  title={title}
                  price={price}
                  image={image}
                  rating={rating}
                />
              );
            })}
          </div>
          <div className="home__row">
            {botData.map((product, index) => {
              const { id, title, price, image, rating } = product;
              return (
                <Product
                  key={`${id}-${index}`}
                  id={id}
                  title={title}
                  price={price}
                  image={image}
                  rating={rating}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
