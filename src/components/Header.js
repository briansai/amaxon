import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { useStateValue } from '../context/StateProvider';
import HeaderDropdown from './HeaderDropdown';
import { headerOptions } from '../utils/constants';
import { getFirstName } from '../utils/functions';
import './Header.css';
import { auth } from '../firebase';

function Header() {
  const [{ cart, user }] = useStateValue();
  const handleAuthentication = () => {
    user && auth.signOut();
  };

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
          let { line1, line2, link } = option;
          let checkAuth;
          if (link === '/login' && user) {
            line1 = `Hello ${getFirstName(user.displayName)}`;
            line2 = 'Sign Out';
            link = '/';
            checkAuth = handleAuthentication;
          }

          return (
            <Fragment>
              <Link
                to={link}
                key={`${line1}-${line2}-${index}`}
                onClick={checkAuth}
              >
                <div className="header__option">
                  <span className="header__option-line-1">{line1}</span>
                  <span className="header__option-line-2">{line2}</span>
                </div>
              </Link>
              {line2 === 'Settings' ? <HeaderDropdown /> : null}
            </Fragment>
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
