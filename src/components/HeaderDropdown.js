import React, { useState } from 'react';
import { useStateValue } from '../context/StateProvider';
import './HeaderDropdown.css';

function HeaderDropdown({ setDropdown }) {
  const [{ toast }, dispatch] = useStateValue();
  const [notify, setNotify] = useState(toast);
  const handleCheckBox = () => {
    setNotify(!notify);
  };

  const saveChanges = (e) => {
    e.preventDefault();

    dispatch({
      type: 'SET_NOTIFICATIONS',
      notify,
    });

    setDropdown(false);
  };

  return (
    <div className="header-dropdown">
      <div className="header-dropdown__header">
        <h3 className="header-dropdown__header-title">Settings</h3>
        <div className="header-dropdown__header-close">
          <button onClick={() => setDropdown(false)}>x</button>
        </div>
      </div>
      <div className="header-dropdown__arrow">
        <div className="header-dropdown__arrow-inner"></div>
      </div>
      <div className="header-dropdown__option">
        <input
          type="checkbox"
          name="checkbox"
          value={notify}
          onChange={handleCheckBox}
          checked={notify}
        />
        <label className="header-dropdown__option-text">
          Enable Notifications
        </label>
      </div>
      <div className="header-dropdown__option-save">
        <button
          className="header-dropdown__option-save-text"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default HeaderDropdown;
