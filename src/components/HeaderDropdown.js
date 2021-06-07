import React from 'react';
import './HeaderDropdown.css';

function HeaderDropdown() {
  return (
    <div className="header-dropdown">
      <div className="header-dropdown__close">
        <button>x</button>
      </div>
      <div className="header-dropdown__arrow">
        <div className="header-dropdown__arrow-inner"></div>
      </div>
      <div className="header-dropdown__option">
        <input type="checkbox" />
        <div className="header-dropdown__option-text">Enable Notifications</div>
      </div>
      <div className="header-dropdown__option-save">
        <button className="header-dropdown__option-save-text">
          Save Changes
        </button>
      </div>
    </div>
  );
}

export default HeaderDropdown;
