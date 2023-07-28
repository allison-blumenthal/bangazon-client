import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Button, { Form } from 'react-bootstrap';
import { updateOrder } from '../../utils/data/orderData';
import { getPaymentTypes } from '../../utils/data/paymentTypeData';

function CartCheckoutForm({ orderObj }) {
  const [currentOrder, setCurrentOrder] = useState({});
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    getPaymentTypes().then(setPaymentTypes);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // set loading state to true while form is being submitted
    setIsLoading(true);

    const updatedOrder = {
      id: orderObj.id,
      customerId: orderObj.customer_id,
      paymentType: currentOrder.paymentType,
      total: orderObj.total,
      needsShipping: currentOrder.needsShipping,
      isCompleted: true,
      datePlaced: todayDate,
    };
    updateOrder(updatedOrder).then(() => {
      // set loading state back to false after form has been submitted
      setIsLoading(false);
      router.push('/confirmation');
    });
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
          {paymentTypes.map((paymentType) => (
            <option
              key={paymentType.id}
              value={paymentType.id}
            >
              {paymentType.label}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          name="needsShipping"
          onChange={handleChange}
          className="mb-3"
          value={currentOrder.needsShipping}
          required
        >
          <option value="">Shipping or Local Pickup?</option>
          <option selected={!currentOrder.needsShipping}>Please ship my order to me.</option>
          <option selected={currentOrder.needsShipping}>I will pick up my order locally.</option>
        </Form.Select>
        <Button variant="primary" type="submit" disabled={isLoading}>
          {isLoading ? 'Placing Order...' : 'Place Order'}
        </Button>
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
