import React from 'react';
import { useStateValue } from '../context/StateProvider';
import Notification from './Notification';

function Notifications({}) {
  const [{ notifications }, dispatch] = useStateValue();

  return (
    <div>
      {notifications.map((notification, index) => (
        <Notification
          key={`${notification.id}-${index}`}
          notification={notification}
        />
      ))}
    </div>
  );
}

export default Notifications;
