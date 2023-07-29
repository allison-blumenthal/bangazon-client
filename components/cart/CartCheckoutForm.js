import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { createOrder, updateOrder } from '../../utils/data/orderData';
import { getPaymentTypes } from '../../utils/data/paymentTypeData';
import { useAuth } from '../../utils/context/authContext';

export default function CartCheckoutForm({ orderObj }) {
  const [currentOrder, setCurrentOrder] = useState({});
  const [paymentTypes, setPaymentTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

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
    getPaymentTypes().then((data) => {
      setPaymentTypes(data);
    });

    if (orderObj.id) {
      setCurrentOrder({
        id: orderObj.id,
        customerId: orderObj.customer_id.id,
        paymentType: orderObj.payment_type.id,
        total: orderObj.total,
        needsShipping: orderObj.needs_shipping,
        isCompleted: orderObj.is_completed,
        datePlaced: orderObj.date_placed,
      });
    }
  }, [orderObj]);

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;

    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    const newValue = value === 'true';

    setCurrentOrder((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // set loading state to true while form is being submitted
    setIsLoading(true);

    const updatedOrder = {
      id: orderObj.id,
      customerId: orderObj.customer_id.id,
      paymentType: Number(currentOrder.paymentType),
      total: orderObj.total,
      needsShipping: currentOrder.needsShipping,
      isCompleted: true,
      datePlaced: todayDate,
    };
    updateOrder(updatedOrder).then(() => {
      // set loading state back to false after form has been submitted
      setIsLoading(false);

      const payload = {
        customerId: user.id,
        paymentType: 1,
        total: 0,
        needsShipping: true,
        isCompleted: false,
        datePlaced: todayDate,
      };

      createOrder(payload);
      router.push('/confirmation');
    });
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Select
          name="paymentType"
          onChange={handlePaymentChange}
          className="mb-3"
          value={currentOrder.paymentType}
          required
        >
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
          onChange={handleShippingChange}
          className="mb-3"
          value={currentOrder.needsShipping?.toString()}
          required
        >
          <option value="true">Please ship my order to me.</option>
          <option value="false">I will pick up my order locally.</option>
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
    customer_id: PropTypes.shape({
      id: PropTypes.number,
    }),
    payment_type: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }),
    total: PropTypes.string,
    needs_shipping: PropTypes.bool,
    is_completed: PropTypes.bool,
    date_placed: PropTypes.string,
  }).isRequired,
};
