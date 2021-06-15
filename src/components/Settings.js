import React, { useState } from 'react';
import {
  Checkbox,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@material-ui/core';
import { useStateValue } from '../context/StateProvider';

function Settings() {
  const [{ toast }, dispatch] = useStateValue();
  const [notify, setNotify] = useState(toast);
  const saveSettings = (e) => {
    e.preventDefault();
    dispatch({
      type: 'SET_NOTIFICATIONS',
      toast: notify,
    });
    dispatch({
      type: 'SET_SETTINGS_OPEN',
      settingsOpen: false,
    });
  };
  const handleCheckbox = () => {
    setNotify(!notify);
  };

  return (
    <div style={{ height: '200px' }}>
      <List>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 20px',
          }}
        >
          <div>Settings</div>
          <button
            style={{ width: '95%', height: '10%', textAlign: 'right' }}
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
        {['Enable Notifications'].map((text, index) => (
          <ListItem button key={`${text}-${index}`}>
            <Checkbox
              disableRipple={true}
              checked={notify}
              color="primary"
              onChange={handleCheckbox}
            />
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <div
        style={{
          position: 'absolute',
          bottom: 20,
          right: 30,
          fontSize: '12px',
        }}
      >
        <Button variant="contained" size="small" onClick={saveSettings}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default Settings;
