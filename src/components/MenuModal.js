import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollLock from 'react-scrolllock';
import { useStateValue } from '../context/StateProvider';
import { handleAuthentication } from '../utils/functions';
import Drawer from '@material-ui/core/Drawer';
import Settings from './Settings';
import './MenuModal.css';

function MenuModal() {
  const [{ user, burgerOpen, settingsOpen }, dispatch] = useStateValue();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    dispatch({
      type: 'SET_SETTINGS_OPEN',
      settingsOpen: open,
    });
  };

  return (
    <div className="modal">
      <div className="modal__container">
        <Link
          to={!user ? '/login' : '/'}
          onClick={() => {
            handleAuthentication(user);
            dispatch({
              type: 'SET_BURGER_OPEN',
              burgerOpen: false,
            });
          }}
        >
          <div className="modal__content">Sign In</div>
        </Link>
        <Link
          to="/orders"
          onClick={() => {
            dispatch({
              type: 'SET_BURGER_OPEN',
              burgerOpen: false,
            });
          }}
        >
          <div className="modal__content">Returns & Orders</div>
        </Link>
        <div className="modal__content" onClick={toggleDrawer(true)}>
          Manage Settings
        </div>
      </div>

      <Drawer anchor={'bottom'} open={settingsOpen}>
        <Settings />
      </Drawer>
      <ScrollLock isActive={burgerOpen} />
    </div>
  );
}

export default MenuModal;
