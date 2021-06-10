import React, { Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../context/StateProvider';
import { getCartTotal } from '../utils/functions';
import './Subtotal.css';

function Subtotal() {
  const [{ cart }] = useStateValue();
  const history = useHistory();
  const goToPayment = (e) => {
    e.preventDefault();
    history.push('/payment');
  };

  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <div className="subtotal__text">
            <p>
              Subtotal ({cart.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </div>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button
        disabled={cart.length ? false : true}
        onClick={goToPayment}
        className={!cart.length ? 'disabled' : null}
      >
        Proceed to Checkout
      </button>
    </div>
  );
}

export default Subtotal;
