import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import './Header.css';

function Header() {
  return (
    <div className="header">
      <img
        className="header__logo"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt=""
      />
      <div className="header__search">
        <input className="header__search-input" type="text" />
        <SearchIcon className="header__search-icon" />
      </div>
      <div className="header__nav">
        <div className="header__option">
          <span className="header__option-line-1">Hello Guest</span>
          <span className="header__option-line-2">Sign In</span>
        </div>
        <div className="header__option">
          {' '}
          <span className="header__option-line-1">Returns</span>
          <span className="header__option-line-2">& Orders</span>
        </div>
        <div className="header__option">
          {' '}
          <span className="header__option-line-1">Your</span>
          <span className="header__option-line-2">Prime</span>
        </div>
        <div className="header__option-basket">
          <ShoppingCartIcon />
          <span className="header__option-line-2 header__basket-count">0</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
