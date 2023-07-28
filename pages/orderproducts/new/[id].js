/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import OrderProductForm from '../../../components/orderProduct/OrderProductForm';
import { getSingleProduct } from '../../../utils/data/productData';

const NewOrderProduct = () => {
  const router = useRouter();
  const [productDetails, setProductDetails] = useState({});

  const { id } = router.query;

  const getProductDetails = async () => {
    try {
      const details = await getSingleProduct(id);
      setProductDetails(details);
    } catch (error) {
      console.error('Error fetching product details: ', error);
    }
  };

  useEffect(() => {
    getProductDetails();
    // console.warn('product details', productDetails);
  }, []);

  return (
    <>
      <OrderProductForm productObj={productDetails} />
    </>
  );
};

export default NewOrderProduct;
