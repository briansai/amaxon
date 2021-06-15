import React from 'react';
import { Link } from 'react-router-dom';
import ScrollLock from 'react-scrolllock';
import Settings from './Settings';
import { useStateValue } from '../context/StateProvider';
import { handleAuthentication } from '../utils/functions';
import './MenuModal.css';

function MenuModal() {
  const [{ user, burgerOpen, settingsOpen }, dispatch] = useStateValue();

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
          onClick={() =>
            dispatch({
              type: 'SET_BURGER_OPEN',
              burgerOpen: false,
            })
          }
        >
          <div className="modal__content">Returns & Orders</div>
        </Link>
        <div
          className="modal__content"
          onClick={() =>
            dispatch({
              type: 'SET_SETTINGS_OPEN',
              settingsOpen: true,
            })
          }
        >
          Manage Settings
        </div>
      </div>
      {settingsOpen && <Settings />}

      <ScrollLock isActive={burgerOpen} />
    </div>
  );
}

export default MenuModal;
