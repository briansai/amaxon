import React, { useEffect } from 'react';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import './MenuModal.css';

function MenuModal({ burgerOpen }) {
  useEffect(() => {
    const targetElement = document.querySelector('.modal');
    burgerOpen && disableBodyScroll(targetElement);
    !burgerOpen && enableBodyScroll(targetElement);
  }, []);
  return (
    <div className="modal">
      <div className="modal__content">Sign In</div>
      <div className="modal__content">Returns & Orders</div>
      <div className="modal__content">Manage Settings</div>
    </div>
  );
}

export default MenuModal;
