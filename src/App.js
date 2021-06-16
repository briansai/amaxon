import { useEffect, useState, Fragment } from 'react';
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

const promise = loadStripe(
  'pk_test_51HK9XLAuR811nlCyvEmZhSEIZHFdNeAk6XMcbcJTGHmLANUaKDiyQKvMJA4ARFmtOIoA3dMlIDWTymMqUQHJfJbM00nzbJ7xdP'
);

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [headerInView, setHeaderInView] = useState(true);

  useEffect(() => {
    !user &&
      auth.onAuthStateChanged((authUser) => {
        dispatch({ type: 'SET_USER', user: authUser || null });
      });

    //   // checks if header is in view
    //   function isInViewport(el) {
    //     const rect = el.getBoundingClientRect();
    //     return rect.bottom > 0;
    //   }

    //   const header = document.querySelector('.header');

    //   document.addEventListener('scroll', function () {
    //     const view = isInViewport(header);
    //     if (headerInView !== view) {
    //       setHeaderInView(view);
    //     }
    //   });
  }, [headerInView, user, dispatch]);

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
          <ToastContainer
            className={`${headerInView ? 'toast__header' : 'toast__no-header'}`}
          />
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
