/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/product/ProductForm';
import { getSingleProduct } from '../../../utils/data/productData';

const EditProduct = () => {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getProductDetails = async () => {
    try {
      const details = await getSingleProduct(id);
      setEditProduct(details);
    } catch (error) {
      console.error('Error fetching product details: ', error);
    }
  };

  useEffect(() => {
    getProductDetails();

    console.warn('edit product: ', editProduct);
  }, [id]);

  return (
    <div>
      <br />
      <h1>Edit Product</h1>
      <ProductForm productObj={editProduct} />
    </div>
  );
};

export default EditProduct;
