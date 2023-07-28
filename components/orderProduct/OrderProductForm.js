/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createOrderProduct, updateOrderProduct } from '../../utils/data/orderProductData';
import { getOpenOrderByUserId } from '../../utils/data/orderData';

const initialState = {
  orderId: '',
  productId: '',
  quantity: 0,
};

function OrderProductForm({ orderProductObj, productObj }) {
  const [openOrder, setOpenOrder] = useState({});
  const [currentOrderProduct, setCurrentOrderProduct] = useState(initialState);
  const { user } = useAuth();
  const router = useRouter();

  // function to get the open order of the user that is logged in
  const getOpenOrder = async () => {
    try {
      const order = await getOpenOrderByUserId(user.id);
      setOpenOrder(order);
    } catch (error) {
      console.error('Error fetching open order: ', error);
    }
  };

  // call the function to get access to the info
  useEffect(() => {
    getOpenOrder();
  }, [user.id]);

  useEffect(() => {
    if (orderProductObj.id) {
      setCurrentOrderProduct({
        id: orderProductObj.id,
        orderId: orderProductObj.order_id,
        productId: orderProductObj.product_id,
        quantity: orderProductObj.quantity,
      });
    }
  }, [orderProductObj]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (orderProductObj.id) {
      let Qty = Number(currentOrderProduct.quantity);

      const updatedOrderProduct = {
        id: orderProductObj.id,
        orderId: Number(currentOrderProduct.orderId),
        productId: Number(currentOrderProduct.productId),
        quantity: (Qty += 1),
      };
      updateOrderProduct(updatedOrderProduct).then(() => router.push('/cart'));
    } else {
      const orderProduct = {
        orderId: Number(openOrder.id),
        productId: Number(productObj.id),
        quantity: 1,
      };
      createOrderProduct(orderProduct).then(() => router.push('/cart'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Button variant="primary" type="submit">Add to Cart</Button>
      </Form>

    </>
  );
}

OrderProductForm.propTypes = {
  orderProductObj: PropTypes.shape({
    id: PropTypes.number,
    order_id: PropTypes.number,
    product_id: PropTypes.number,
    quantity: PropTypes.number,
  }),
  productObj: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
};

OrderProductForm.defaultProps = {
  orderProductObj: initialState,
};

export default OrderProductForm;
