/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
function OrderCard({ orderObj, onUpdate }) {
  return (
    <Card className="text-center order-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{orderObj.date_placed}</Card.Header>
      <Card.Body>Total: ${orderObj.total}</Card.Body>
      <Card.Footer className="text-muted">Payment Type: {orderObj.payment_type.label}</Card.Footer>
      <div>
        <Link href={`/orders/${orderObj.id}`} passHref>
          <Button type="button" className="m-2">View Order</Button>
        </Link>
      </div>
    </Card>
  );
}

OrderCard.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    date_placed: PropTypes.string,
    total: PropTypes.string,
    payment_type: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default OrderCard;
