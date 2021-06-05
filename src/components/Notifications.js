import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import Notification from './Notification';
import './Notifications.css';

function Notifications() {
  let [{ notifications }] = useStateValue();

  return (
    <div className="notifications">
      {notifications.map((notification, index) => {
        return (
          <Notification
            key={`${notification.id}-${index}`}
            notification={notification}
            index={index}
          />
        );
      })}
    </div>
  );
}

export default Notifications;
