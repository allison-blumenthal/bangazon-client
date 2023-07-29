/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { getCategories } from '../../utils/data/categoryData';
import { createProduct, updateProduct } from '../../utils/data/productData';

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

const initialState = {
  sellerId: 0,
  name: '',
  description: '',
  price: 0.00,
  quantity: 0,
  productImageUrl: '',
  addedOn: todayDate,
  categoryId: 0,
};

function ProductForm({ productObj }) {
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then((data) => {
      setCategories(data);
    });

    if (productObj.id) {
      setCurrentProduct({
        id: productObj.id,
        sellerId: productObj.seller_id.id,
        name: productObj.name,
        description: productObj.description,
        price: productObj.price,
        quantity: productObj.quantity,
        productImageUrl: productObj.product_image_url,
        addedOn: productObj.added_on,
        categoryId: productObj.category_id.id,
      });
    }
  }, [productObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (productObj.id) {
      const updatedProduct = {
        id: currentProduct.id,
        sellerId: user.id,
        name: currentProduct.name,
        description: currentProduct.description,
        price: Number(currentProduct.price),
        quantity: Number(currentProduct.quantity),
        productImageUrl: currentProduct.productImageUrl,
        addedOn: currentProduct.addedOn,
        categoryId: Number(currentProduct.categoryId),
      };
      updateProduct(updatedProduct).then(() => router.push('/'));
    } else {
      const product = {
        sellerId: user.id,
        name: currentProduct.name,
        description: currentProduct.description,
        price: Number(currentProduct.price),
        quantity: Number(currentProduct.quantity),
        productImageUrl: currentProduct.productImageUrl,
        addedOn: todayDate,
        categoryId: Number(currentProduct.categoryId),
      };
      console.warn(productObj);
      createProduct(product).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control name="name" required value={currentProduct.name} onChange={handleChange} type="text" />

          <Form.Label>Product Description</Form.Label>
          <Form.Control name="description" required value={currentProduct.description} onChange={handleChange} type="text" />

          <Form.Label>Product Price</Form.Label>
          <Form.Control name="price" required value={currentProduct.price} onChange={handleChange} type="text" />

          <Form.Label>Quantity</Form.Label>
          <Form.Control name="quantity" required value={currentProduct.quantity} onChange={handleChange} type="text" />

          <Form.Label>Product Image URL</Form.Label>
          <Form.Control name="productImageUrl" required value={currentProduct.productImageUrl} onChange={handleChange} type="text" />
        </Form.Group>

        <Form.Group className="floatingSelect">
          <Form.Label>Product Category</Form.Label>
          <Form.Select
            name="categoryId"
            onChange={handleChange}
            className="mb-3"
            value={currentProduct.categoryId}
            required
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option
                key={category.id}
                value={category.id}
              >
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {productObj.id ? 'Update' : 'Create'} Product
        </Button>

      </Form>
    </>
  );
}

ProductForm.propTypes = {
  productObj: PropTypes.shape({
    id: PropTypes.number,
    seller_id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
    product_image_url: PropTypes.string,
    added_on: PropTypes.string,
    category_id: PropTypes.number,
  }),
};

ProductForm.defaultProps = {
  productObj: initialState,
};

export default ProductForm;
