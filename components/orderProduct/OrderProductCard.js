/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
function OrderProductCard({ orderProductObj, onUpdate }) {
  return (
    <Card className="text-center orderProduct-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{orderProductObj.product_id.name}</Card.Header>
      <Card.Body>
        <Card.Img src={orderProductObj.product_id.product_image_url} alt="product" />
        <h2>Price: ${orderProductObj.product_id.price}</h2>
        <h3>Quantity: {orderProductObj.quantity}</h3>
      </Card.Body>
      <Card.Footer className="text-muted">Seller: {orderProductObj.product_id.seller_id.username}</Card.Footer>
      <div>
        <Link href={`/products/${orderProductObj.product_id.id}`} passHref>
          <Button type="button" className="m-2">View</Button>
        </Link>
      </div>
    </Card>
  );
}

OrderProductCard.propTypes = {
  orderProductObj: PropTypes.shape({
    id: PropTypes.number,
    quantity: PropTypes.number,
    product_id: PropTypes.shape({
      id: PropTypes.number,
      seller_id: PropTypes.shape({
        username: PropTypes.string,
      }),
      name: PropTypes.string,
      price: PropTypes.number,
      product_image_url: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderProductCard;
