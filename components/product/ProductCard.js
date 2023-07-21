/* eslint-disable @next/next/no-img-element */
import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';

// eslint-disable-next-line no-unused-vars
function ProductCard({ productObj, onUpdate }) {
  return (
    <Card className="text-center post-card">
      <Card.Header>{productObj.name}</Card.Header>
      <Card.Body>
        <img src={productObj.product_image_url} alt="product" />
      </Card.Body>
      <Card.Footer className="text-muted">Seller: {productObj.seller_id.username}</Card.Footer>
      <div>
        <Link href={`/products/${productObj.id}`} passHref>
          <Button type="button" className="m-2">View</Button>
        </Link>
      </div>
    </Card>
  );
}

ProductCard.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    seller_id: PropTypes.shape({
      username: PropTypes.string,
    }),
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    product_image_url: PropTypes.string,
    added_on: PropTypes.string,
    category_id: PropTypes.shape({
      label: PropTypes.string,
    }),
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
