/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getProductsByCategoryId } from '../../utils/data/productData';
import CategoryProductCard from './CategoryProductCard';

export default function CategoryCard({ categoryObj }) {
  const [categoryProducts, setCategoryProducts] = useState([]);

  const getFirstThreeProducts = async () => {
    try {
      const products = await getProductsByCategoryId(categoryObj.id);
      const three = products.slice(0, 3);
      console.warn(three);
      setCategoryProducts(three);
    } catch (error) {
      console.error('Error fetching category products: ', error);
    }
  };

  useEffect(() => {
    getFirstThreeProducts();
  }, []);

  return (
    <Card className="text-center category-card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Header>{categoryObj.label}</Card.Header>
      <Card.Body className="three-products">
        {categoryProducts.map((categoryProduct) => (
          <section key={`categoryProduct--${categoryProduct.id}`} className="category-products">
            <CategoryProductCard categoryProductObj={categoryProduct} onUpdate={getFirstThreeProducts} />
          </section>
        ))}
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
