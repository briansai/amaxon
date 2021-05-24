import React from 'react';
import Product from '../components/Product';
import { topData, midData, botData } from '../utils/data';
import './Home.css';

function Home() {
  return (
    <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._cb428684220_.JPG"
          alt=""
        />
        <div className="home__row">
          {topData.map((product) => {
            const { title, price, image, rating } = product;
            return (
              <Product
                title={title}
                price={price}
                image={image}
                rating={rating}
              />
            );
          })}
        </div>
        <div className="home__row">
          {midData.map((product) => {
            const { title, price, image, rating } = product;
            return (
              <Product
                title={title}
                price={price}
                image={image}
                rating={rating}
              />
            );
          })}
        </div>
        <div className="home__row">
          {botData.map((product) => {
            const { title, price, image, rating } = product;
            return (
              <Product
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
  );
}

export default Home;
