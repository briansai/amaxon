import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CircularProgress } from '@material-ui/core';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CopyToClipboard from 'react-copy-to-clipboard';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import DoneIcon from '@material-ui/icons/Done';
import { db } from '../firebase';
import { useStateValue } from '../context/StateProvider';
import CheckoutProduct from '../components/CheckoutProduct';
import { getCartTotal } from '../utils/functions';
import { cardInfo } from '../utils/constants';
import buildClient from '../api/buildClient';
import './Payment.css';

function Payment() {
  const [err, setErr] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [state, setState] = useState({
    Card: false,
    'MM/YY': false,
    CVC: false,
    ZIP: false,
  });
  const [{ cart, user }, dispatch] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const response = await buildClient({
      method: 'post',
      url: `/payment/create?total=${getCartTotal(cart) * 100}`,
    });

    !user
      ? history.push('/login')
      : stripe
          .confirmCardPayment(response.data.clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement),
            },
          })
          .then((confirmation) => {
            const { id, amount, created } = confirmation?.paymentIntent;

            db.collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(id)
              .set({
                cart,
                amount,
                created,
              });

            setErr(null);
            setProcessing(false);

            dispatch({
              type: 'EMPTY_CART',
            });

            history.replace('/orders');
          })
          .catch((err) => {
            setProcessing(false);
            console.log(err.message);
          });
  };

  const handleChange = (e) => {
    const { error } = e;

    setErr(error?.message || '');
  };

  const handleCopy = (text) => {
    setState((prev) => {
      const copied = Object.keys(prev).reduce((acc, cur) => {
        if (cur === text) {
          acc[cur] = true;
        } else {
          acc[cur] = false;
        }
        return acc;
      }, {});

      return copied;
    });
  };

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>Checkout {<Link to="/checkout"> ({cart.length}) items </Link>}</h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Deliver Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.displayName}</p>
            <p>123 Potato Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <fieldset className="payment__stripe">
              <CardElement
                onChange={handleChange}
                className="payment__form-row"
              />
            </fieldset>
            {err && <div className="payment__error">* {err}</div>}
            <p className="payment__stripe--text">
              ** Stripe API does not allow for pre-defined values for the
              following fields. Please enter the values provided. (Card number
              must be exact)
            </p>
            <table className="payment__stripe--table">
              <tbody>
                {cardInfo.map((info, index) => {
                  const { text, num } = info;
                  return (
                    <tr key={`${text}-${index}`}>
                      <td className="payment__stripe--field">{`${text}:`}</td>
                      <td>
                        <span className="payment__stripe--num">{num}</span>
                        {state[text] ? (
                          <span className="payment__stripe--copied">
                            Copied
                            <DoneIcon fontSize="inherit" viewBox="0 0 20 20" />
                          </span>
                        ) : (
                          <CopyToClipboard
                            text={num}
                            onCopy={() => handleCopy(text)}
                            className="clipboard"
                          >
                            <FileCopyIcon fontSize="inherit" />
                          </CopyToClipboard>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items</h3>
          </div>
          <div className="payment__content">
            <div className="payment__items">
              {cart.map((item, index) => (
                <CheckoutProduct key={`${item.id}-${index}`} item={item} />
              ))}
            </div>
            <form className="payment__form" onSubmit={handleSubmit}>
              <CurrencyFormat
                renderText={(value) => <h3>Order Total: {value} </h3>}
                decimalScale={2}
                value={getCartTotal(cart)}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                className="payment__total"
              />
              {processing ? (
                <div className="payment__processing">
                  <CircularProgress />
                </div>
              ) : (
                <button
                  disabled={!cart.length}
                  className={!cart.length ? 'disabled' : null}
                  // onClick={handleSubmit}
                >
                  {'Place Your Order'}
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
