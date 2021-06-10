import React from 'react';
import CurrencyFormat from 'react-currency-format';
import moment from 'moment';
import './OrderHeader.css';

function OrderHeader({ id, data }) {
  const { created, amount } = data;
  return (
    <div className="order-header">
      <div className="order-header__detail">
        <div className="order-header__date">
          <div className="order-header__text">Order Placed</div>
          <p className="order-header__content">
            {moment.unix(created).format('MMMM Do YYYY')}
          </p>
        </div>
        <div className="order-header__total">
          <div className="order-header__text">Total</div>
          <div className="order-header__content">
            <CurrencyFormat
              renderText={(value) => <div>{value}</div>}
              decimalScale={2}
              value={amount / 100}
              displayType={'text'}
              thousandSeparator={true}
              prefix={'$'}
            />
          </div>
        </div>
      </div>
      <div className="order-header__number">
        <p className="order-header__id">
          <small className="order-header__text">Order#: {id}</small>
        </p>
      </div>
    </div>
  );
}

export default OrderHeader;
