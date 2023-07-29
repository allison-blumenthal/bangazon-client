import PropTypes from 'prop-types';
import React from 'react';
import { Card } from 'react-bootstrap';

function CategoryCard({ categoryObj }) {
  return (
    <Card className="text-center category-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{categoryObj.label}</Card.Header>
      <Card.Body>
        <h2>Product 1</h2>
        <h2>Product 2</h2>
        <h2>Product 3</h2>
      </Card.Body>
    </Card>
  );
}

CategoryCard.propTypes = {
  categoryObj: PropTypes.shape({
    id: PropTypes.number,
    label: PropTypes.string,
  }).isRequired,
};

export default CategoryCard;
