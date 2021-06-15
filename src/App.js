import { useEffect, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { auth } from './firebase';
import { LastLocationProvider } from 'react-router-last-location';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Payment from './pages/Payment';
import Orders from './pages/Orders';
import { useStateValue } from './context/StateProvider';
import './App.css';

const promise = loadStripe(
  'pk_test_51HK9XLAuR811nlCyvEmZhSEIZHFdNeAk6XMcbcJTGHmLANUaKDiyQKvMJA4ARFmtOIoA3dMlIDWTymMqUQHJfJbM00nzbJ7xdP'
);

function App() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      dispatch({ type: 'SET_USER', user: authUser || null });
    });
  }, [dispatch]);

  const PrivateRoute = () => (
    <Route
      render={(props) => {
        if (user) {
          const key = props.location?.pathname.slice(1);
          const paths = {
            orders: (
              <Fragment>
                <Header />
                <Orders />
              </Fragment>
            ),
            payment: (
              <Fragment>
                <Header />
                <Elements stripe={promise}>
                  <Payment />
                </Elements>
              </Fragment>
            ),
          };

          return paths[key];
        }

        return <Login {...props} />;
      }}
    />
  );

  return (
    <Router>
      <LastLocationProvider>
        <div className="app">
          <ToastContainer className="home__toast-container" />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/orders" />
            <Route path="/checkout">
              <Header />
              <Checkout />
            </Route>
            <PrivateRoute path="/payment" />
            <Route exact path="/">
              <Header />
              <Home />
            </Route>
          </Switch>
        </div>
      </LastLocationProvider>
    </Router>
  );
}

export default App;
