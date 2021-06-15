import React from 'react';
import { Animate } from 'react-simple-animate';
import { useStateValue } from '../context/StateProvider';
import './Settings.css';

function Settings() {
  const [, dispatch] = useStateValue();

  return (
    <div className="settings">
      <button
        className="settings__close"
        onClick={() => {
          dispatch({
            type: 'SET_SETTINGS_OPEN',
            settingsOpen: false,
          });
        }}
      >
        X
      </button>
    </div>
  );
}

export default Settings;
