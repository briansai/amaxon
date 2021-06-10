import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import useClickOutside from 'use-click-outside';
import { useStateValue } from '../context/StateProvider';
import HeaderDropdown from './HeaderDropdown';
import './Header.css';
import { auth } from '../firebase';
import { getFirstName } from '../utils/functions';

function Header() {
  const [{ cart, user }] = useStateValue();
  const [dropdown, setDropdown] = useState(false);
  const settingsRef = useRef();
  const handleAuthentication = () => {
    user && auth.signOut();
  };

  const exitClick = () => {
    dropdown && setDropdown(false);
  };

  useClickOutside(settingsRef, exitClick);

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
        <Link to={!user ? '/login' : '/'} onClick={handleAuthentication}>
          <div className="header__option">
            <span className="header__option-line-1">
              Hello {user ? getFirstName(user?.displayName) : 'Guest'}
            </span>
            <span className="header__option-line-2">
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>
        <Link to={'/orders'}>
          <div className="header__option">
            <span className="header__option-line-1">Returns</span>
            <span className="header__option-line-2">& Orders</span>
          </div>
        </Link>
        <div ref={settingsRef}>
          <div
            className="header__option"
            onClick={() => setDropdown(!dropdown)}
          >
            <span className="header__option-line-1">Manage</span>
            <span className="header__option-line-2">Settings</span>
          </div>
          {dropdown ? <HeaderDropdown setDropdown={setDropdown} /> : null}
        </div>
        <div className="header__menu">
          <Button>
            <MenuIcon style={{ color: '#fafafa' }} />
          </Button>
        </div>

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
