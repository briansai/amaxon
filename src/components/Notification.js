import React from 'react';
import './Notification.css';

function Notification({ notification, index }) {
  return (
    <div className="notification">
      <div className="notification__header">
        <strong className="notification__title">Item Added</strong>
        <div className="notification__remove">x</div>
      </div>
      <div className="notification__message">{`${notification.title} was added to cart.`}</div>
    </div>
  );
}

export default Notification;
