import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useLastLocation } from 'react-router-last-location';
import { auth } from '../firebase';
import { authInputs } from '../utils/constants';
import './Login.css';

function Login() {
  const [{ email, password }, setState] = useState({
    authInputs,
  });
  const history = useHistory();
  const lastLocation = useLastLocation();
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const signIn = (e) => {
    e.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        lastLocation.pathname === '/payment'
          ? history.push('/payment')
          : history.push('/');
      })
      .catch((err) => alert(err.message));
  };

  const register = () => {
    history.push('/register');
  };

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      <div className="login__container">
        <h1>Sign-in</h1>
        <form onSubmit={signIn}>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email || ''}
            name="email"
            onChange={handleInput}
            required
          />
          <h5>Password</h5>
          <input
            type="password"
            value={password || ''}
            name="password"
            onChange={handleInput}
            required
          />
          <button className="login__sign-in-button" type="submit">
            Sign In
          </button>
        </form>
        <p>
          By signing in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice
        </p>
        <button className="login__register-button" onClick={register}>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
