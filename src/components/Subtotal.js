import React, { Fragment } from 'react';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../context/StateProvider';
import { getCartTotal } from '../utils/functions';
import './Subtotal.css';

function Subtotal() {
  const [{ cart }] = useStateValue();
  return (
    <div className="subtotal">
      <CurrencyFormat
        renderText={(value) => (
          <Fragment>
            <p>
              Subtotal ({cart.length} items):
              <strong>{`${value}`}</strong>
            </p>
            <small className="subtotal__gift">
              <input type="checkbox" /> This order contains a gift
            </small>
          </Fragment>
        )}
        decimalScale={2}
        value={getCartTotal(cart)}
        displayType={'text'}
        thousandSeparator={true}
        prefix={'$'}
      />
      <button>Proceed to Checkout</button>
    </div>
  );
}

export default Subtotal;
