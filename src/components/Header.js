import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { headerOptions } from '../utils/constants';
import './Header.css';

function Header() {
  const [{ cart }] = useStateValue();
  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header__search">
        <input className="header__search-input" type="text" />
        <SearchIcon className="header__search-icon" />
      </div>
      <div className="header__nav">
        {headerOptions.map((option, index) => {
          const { line1, line2 } = option;
          return (
            <div key={`${line1}-${line2}-${index}`} className="header__option">
              <span className="header__option-line-1">{line1}</span>
              <span className="header__option-line-2">{line2}</span>
            </div>
          );
        })}
        <Link to="/checkout">
          <div className="header__option-cart">
            <ShoppingCartIcon />
            <span className="header__option-line-2 header__cart-count">
              {cart?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
