import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { useStateValue } from '../context/StateProvider';
import Product from '../components/Product';
import ImageGallery from '../components/ImageGallery';
import { topData, midData, botData } from '../utils/data';
import './Home.css';

function Home() {
  const [{ burgerOpen }] = useStateValue();

  return (
    <div className="home">
      <div className="home__container">
        <ImageGallery />
        <div className={`home__rows ${burgerOpen ? 'background' : null}`}>
          <div className="home__row">
            {topData.map((product, index) => {
              const { id } = product;
              return <Product key={`${id}-${index}`} product={product} />;
            })}
          </div>
          <div className="home__row">
            {midData.map((product, index) => {
              const { id } = product;
              return <Product key={`${id}-${index}`} product={product} />;
            })}
          </div>
          <div className="home__row">
            {botData.map((product, index) => {
              const { id } = product;
              return <Product key={`${id}-${index}`} product={product} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
