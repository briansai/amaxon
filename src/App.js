import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { LastLocationProvider } from 'react-router-last-location';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { auth } from './firebase';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import { useStateValue } from './context/StateProvider';
import './App.css';
import { useInView } from 'react-intersection-observer';
const promise = loadStripe(
  'pk_test_51HK9XLAuR811nlCyvEmZhSEIZHFdNeAk6XMcbcJTGHmLANUaKDiyQKvMJA4ARFmtOIoA3dMlIDWTymMqUQHJfJbM00nzbJ7xdP'
);

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [ref, inView] = useInView({});
  useEffect(() => {
    !user &&
      auth.onAuthStateChanged((authUser) => {
        dispatch({ type: 'SET_USER', user: authUser || null });
      });
  }, [user, dispatch]);

  const PrivateRoute = (props) => {
    const { location } = props;
    if (user) {
      const key = props.location?.pathname.slice(1);
      const paths = {
        orders: (
          <Route>
            <Header />
            <Orders />
          </Route>
        ),
        payment: (
          <Route>
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
        ),
      };

      return paths[key];
    }

    return (
      <Route>
        <Login location={location.pathname} />
      </Route>
    );
  };

  return (
    <Router>
      <LastLocationProvider>
        <div className="app">
          <ToastContainer
            style={{
              right: 0,
              transition: '0.3s ease-in-out',
              top: inView ? '55px' : 0,
            }}
          />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/checkout">
              <Header ref={ref} />
              <Checkout />
            </Route>
            <PrivateRoute path="/orders" />
            <PrivateRoute path="/payment" />
            <Route exact path="/">
              <Header ref={ref} />
              <Home />
            </Route>
          </Switch>
        </div>
      </LastLocationProvider>
    </Router>
  );
}

export default App;
