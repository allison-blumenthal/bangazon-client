/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getSingleProduct } from '../../utils/data/productData';

export default function ViewProduct() {
  const [productDetails, setProductDetails] = useState({});
  const router = useRouter();

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
    router.push('/cart');
  };

  return (
    <>
      <Head>
        <title>{productDetails.name}</title>
      </Head>
      <div className="pd-container">
        <br />
        <h1 className="pd-name">{productDetails.name}</h1>
        <img src={productDetails.product_image_url} alt="product" />
        <div>
          <p>{productDetails.description}</p>
        </div>
        <br />
        <div>
          <Link passHref href={`/products?seller_id=${productDetails.seller_id?.id}`}>
            <h2>Sold by: {productDetails.seller_id?.username}</h2>
          </Link>
          <h4>Quantity Available: {productDetails.quantity}</h4>
          <h3>Price per unit: {productDetails.price}</h3>
        </div>
        <Button variant="primary" onClick={handleClick}>
          Add to Cart
        </Button>
      </div>
    </>
  );
}
