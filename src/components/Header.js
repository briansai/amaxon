import React, { useState, useRef, forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Sling as Hamburger } from 'hamburger-react';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import useClickOutside from 'use-click-outside';
import { useStateValue } from '../context/StateProvider';
import MenuModal from './MenuModal';
import HeaderDropdown from './HeaderDropdown';
import { handleAuthentication, getFirstName } from '../utils/functions';
import './Header.css';

function Header() {
  const [{ cart, user, burgerOpen, settingsOpen }, dispatch] = useStateValue();
  const [dropdown, setDropdown] = useState(false);
  const settingsRef = useRef();
  const exitClick = () => {
    dropdown && setDropdown(false);
  };
  useClickOutside(settingsRef, exitClick);

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header__logo"
          src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
          alt=""
        />
      </Link>
      <div className="header__search">
        <input
          className="header__search-input"
          type="text"
          placeholder="Search functionality is not part of this project's scope and is disabled."
          disabled
        />
        <SearchIcon className="header__search-icon" />
      </div>
      <div className="header__nav">
        <Link
          to={!user ? '/login' : '/'}
          onClick={() => handleAuthentication(user)}
        >
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

        <Link to="/checkout">
          <div className="header__option-cart">
            <ShoppingCartIcon />
            <span className="header__option-line-2 header__cart-count">
              {cart?.length}
            </span>
          </div>
        </Link>
        <div className={`${!settingsOpen ? 'header__menu' : null}`}>
          <Hamburger
            toggled={burgerOpen}
            toggle={() => {
              dispatch({
                type: 'SET_BURGER_OPEN',
                burgerOpen: !burgerOpen,
              });
            }}
            color="white"
            size={18}
          />
        </div>
        {burgerOpen && <MenuModal />}
      </div>
    </div>
  );
}

export default Header;
