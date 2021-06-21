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
  const [headerInView, setHeaderInView] = useState(null);

  useEffect(() => {
    !user &&
      auth.onAuthStateChanged((authUser) => {
        dispatch({ type: 'SET_USER', user: authUser || null });
      });
  }, [user, dispatch]);

  const getInView = (inView) => {
    setHeaderInView(inView);
  };

  const setToastStyle = () => {
    if (headerInView) {
      return { top: '55px', transition: '0.3s ease-in-out' };
    } else if (!headerInView) {
      return { top: 0, transition: '0.3s ease-in-out' };
    }

    return {};
  };

  const PrivateRoute = (props) => {
    if (user) {
      const key = props.location?.pathname.slice(1);
      const paths = {
        orders: (
          <Fragment>
            <Header getInView={getInView} />
            <Orders />
          </Fragment>
        ),
        payment: (
          <Fragment>
            <Header getInView={getInView} />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Fragment>
        ),
      };

      return paths[key];
    }

    return <Login {...props} />;
  };

  return (
    <Router>
      <LastLocationProvider>
        <div className="app">
          <ToastContainer style={setToastStyle()} />
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <PrivateRoute path="/orders" component={Orders} />
            <Route path="/checkout">
              <Header getInView={getInView} />
              <Checkout />
            </Route>
            <PrivateRoute path="/payment" component={Payment} />
            <Route exact path="/">
              <Header getInView={getInView} />
              <Home />
            </Route>
          </Switch>
        </div>
      </LastLocationProvider>
    </Router>
  );
}

export default App;
