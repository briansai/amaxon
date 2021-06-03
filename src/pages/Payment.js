import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useStateValue } from '../context/StateProvider';
import CheckoutProduct from '../components/CheckoutProduct';
import { getCartTotal } from '../utils/functions';
import buildClient from '../api/buildClient';
import './Payment.css';

function Payment() {
  const [err, setErr] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [processing, setProcessing] = useState('');
  const [succeeded, setSucceeded] = useState(false);
  const [clientSecret, setClientSecret] = useState(true);
  const [{ cart, user }] = useStateValue();
  const history = useHistory();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await buildClient({
        method: 'post',
        url: `/payment/create?total=${getCartTotal(cart) * 100}`,
      });

      setClientSecret(response.data.clientSecret);
    };

    cart.length && getClientSecret();
  }, [cart]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(() => {
        setSucceeded(true);
        setErr(null);
        setProcessing(false);
        history.replace('/orders');
      });
  };
  const handleChange = (e) => {
    const { empty, error } = e;
    setDisabled(empty);
    setErr(error?.message || '');
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
            <p>{user?.email}</p>
            <p>123 Potato Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {cart.map((item) => (
              <CheckoutProduct item={item} />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="checkout__price-container">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value} </h3>}
                  decimalScale={2}
                  value={getCartTotal(cart)}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>
                    {processing ? <p>Processing Payment</p> : 'Buy Now'}
                  </span>
                </button>
              </div>
              {err && <div>{err}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
