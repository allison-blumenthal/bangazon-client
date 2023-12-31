/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleProduct, deleteProduct } from '../../utils/data/productData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewProduct() {
  const [productDetails, setProductDetails] = useState({});
  const router = useRouter();
  const { user } = useAuth();

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
  }, []);

  const handleClick = () => {
    router.push(`/orderproducts/new/${id}`);
  };

  const deleteThisProduct = () => {
    if (window.confirm(`Remove ${productDetails.name}?`)) {
      deleteProduct(productDetails.id).then(() => router.push('/'));
    }
  };

  return (
    <>
      <Head>
        <title>{productDetails.name}</title>
      </Head>
      <div className="pd-container">
        <div>
          <h1 className="pd-name">{productDetails.name}</h1>
          <img src={productDetails.product_image_url} alt="product" className="pd-image" />
          <div className="pd-description">
            <p>{productDetails.description}</p>
          </div>
        </div>
        <div className="pd-info-container">
          <h2>Sold by:</h2>
          <Link passHref href={`/products?seller_id=${productDetails.seller_id?.id}`}>
            <h2 className="pd-seller">{productDetails.seller_id?.username}</h2>
          </Link>
          <h4>Quantity Available: {productDetails.quantity}</h4>
          <h3>Price per unit: {productDetails.price}</h3>
          <Button variant="primary" onClick={handleClick}>
            Add to Cart
          </Button>
          {productDetails.seller_id?.id === user.id ? (
            <>
              <Link passHref href={`/products/edit/${id}`}>
                <Button variant="warning" className="edit-btn">Edit Product</Button>
              </Link>
              <Button variant="danger" onClick={deleteThisProduct}>Delete Product</Button>
            </>
          ) : ''}
        </div>
      </div>
    </>
  );
}
