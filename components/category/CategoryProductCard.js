import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
export default function CategoryProductCard({ categoryProductObj, onUpdate }) {
  return (
    <div>
      <Link passHref href={`/products/${categoryProductObj.id}`}>
        <h4>{categoryProductObj.name}</h4>
      </Link>
    </div>
  );
}

CategoryProductCard.propTypes = {
  categoryProductObj: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
