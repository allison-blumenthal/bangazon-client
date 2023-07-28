import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button, { Form } from 'react-bootstrap';
import { updateOrder } from '../../utils/data/orderData';
import { getPaymentTypes}

function CartCheckoutForm({ orderObj }) {
  const [currentOrder, setCurrentOrder] = useState({});
  const router = useRouter();

  const getTodaysDate = () => {
    const today = new Date();

    const formattedDate = today.toLocaleString('en-CA', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

    return formattedDate;
  };

  const todayDate = getTodaysDate();

  useEffect(() => {
    getPaymentTypes
    if (orderObj.id) {
      setCurrentOrder({
        id: orderObj.id,
        customerId: orderObj.customer_id,
        paymentType: orderObj.payment_type,
        total: orderObj.total,
        needsShipping: orderObj.needs_shipping,
        isCompleted: orderObj.is_completed,
        datePlaced: orderObj.date_placed,
      });
    }
  }, [orderObj]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedOrder = {
      id: orderObj.id,
      customerId: orderObj.customer_id,
      paymentType: currentOrder.paymentType,
      total: orderObj.total,
      needsShipping: currentOrder.needsShipping,
      isCompleted: true,
      datePlaced: todayDate,
    };
    updateOrder(updatedOrder).then(() => router.push('/confirmation'));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          name="paymentType"
          onChange={handleChange}
          className="mb-3"
          value={currentOrder.paymentType}
          required
        >
          <option value="">Select a Payment Type</option>
          {paymentTypes.map((paymentType) => {
            <option
              key={payment_type.id}
              value={payment_type.id}
            >
              {payment_type.label}
            </option>
          })}
        </Form.Select>
        <Button variant="primary" type="submit">Place Order</Button>
      </Form>

    </>
  );
}

CartCheckoutForm.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    customer_id: PropTypes.number,
    payment_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    total: PropTypes.number,
    needs_shipping: PropTypes.bool,
    is_completed: PropTypes.bool,
    date_placed: PropTypes.instanceOf(Date),
  }).isRequired,
};

export default CartCheckoutForm;
