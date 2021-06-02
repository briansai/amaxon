import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';
import { homeImages } from '../utils/constants';
import './ImageGallery.css';

function ImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const directions = {
    last: () => {
      !currentIndex
        ? setCurrentIndex(homeImages.length - 1)
        : setCurrentIndex(currentIndex - 1);
    },
    next: () => {
      currentIndex === homeImages.length - 1
        ? setCurrentIndex(0)
        : setCurrentIndex(currentIndex + 1);
    },
  };

  const handleDirection = (e, direction) => {
    e.preventDefault();
    directions[direction]();
  };

  return (
    <div className="image">
      <div className="image__arrow-left">
        <Button onClick={(e) => handleDirection(e, 'last')}>
          <ArrowBackIos fontSize="large" stroke="white" />
        </Button>
      </div>
      <img
        className="image__photo"
        src={homeImages[currentIndex].link}
        alt=""
        width="1500"
        height="600"
      />
      <div className="image__arrow-right">
        <Button onClick={(e) => handleDirection(e, 'next')}>
          <ArrowForwardIos fontSize="large" stroke="white" />
        </Button>
      </div>
    </div>
  );
}

export default ImageGallery;
