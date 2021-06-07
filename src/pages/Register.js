import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { auth } from '../firebase';
import { authInputs, authErrors } from '../utils/constants';
import './Register.css';

function Register() {
  const [{ email, password, firstName, lastName }, setState] = useState({
    authInputs,
  });
  const [errors, setErrors] = useState({
    authErrors,
  });
  const handleInput = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };
  const history = useHistory();
  const register = (e) => {
    e.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        auth.currentUser
          ?.updateProfile({
            displayName: `${firstName} ${lastName}`,
          })
          .then(() => {
            res && history.push('/');
          });
      })
      .catch((err) => {
        const { code, message } = err;
        const errs = {
          'auth/weak-password': () => setErrors({ password: message }),
          'auth/email-already-in-use': () => setErrors({ email: message }),
        };
        errs[code]();
      });
  };
  const signIn = () => {
    history.push('/login');
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
        <h1>Create account</h1>
        <form onSubmit={register}>
          <h5>First Name</h5>
          <input
            type="text"
            value={firstName || ''}
            name="firstName"
            onChange={handleInput}
            required
          />
          <h5>Last Name</h5>
          <input
            type="text"
            value={lastName || ''}
            name="lastName"
            onChange={handleInput}
            required
          />
          <h5>E-mail</h5>
          <input
            type="text"
            value={email || ''}
            name="email"
            onChange={handleInput}
            required
          />
          {errors.email ? (
            <div className="register__errors">`* ${errors.email}` </div>
          ) : null}
          <h5>Password</h5>
          <input
            type="password"
            value={password || ''}
            name="password"
            onChange={handleInput}
            required
          />
          {errors.password ? (
            <div className="register__errors">`* ${errors.password}` </div>
          ) : null}
          <button className="register__register-button" type="submit">
            Create your Amazon account
          </button>
        </form>
        <p>
          By creating an account, you agree to the AMAZON FAKE CLONE's
          Conditions of Use & Sale. Please see our Privacy Notice, our Cookies
          Notice and our Interest-Based Ads Notice
        </p>
        <p className="register__sign-in">
          <span>Already have an account?</span>{' '}
          <button className="register__sign-in-link" onClick={signIn}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
