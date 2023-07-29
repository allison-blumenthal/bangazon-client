import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductForm from '../../../components/product/ProductForm';
import { getSingleProduct } from '../../../utils/data/productData';

const EditProduct = () => {
  const [editProduct, setEditProduct] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleProduct(id).then(setEditProduct);
  }, [id]);

  return (
    <div>
      <br />
      <h1>Edit Product</h1>
      <ProductForm postObj={editProduct} />
    </div>
  );
};

export default EditProduct;
