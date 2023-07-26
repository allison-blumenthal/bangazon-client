/* eslint-disable camelcase */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import ProductCard from '../../components/product/ProductCard';
import { getProductsBySellerId } from '../../utils/data/productData';

export default function SellerStore() {
  const [sellerProducts, setSellerProducts] = useState([]);
  const router = useRouter();

  const { seller_id } = router.query;

  const getAllSellerProducts = () => {
    getProductsBySellerId(seller_id).then((products) => setSellerProducts(products));
  };

  // const getSellerDetails = () => {

  // }

  useEffect(() => {
    getAllSellerProducts();
  }, [seller_id]);

  return (
    <>
      <div className="seller-store-page" />
      <Head>
        <title>{seller_id.username}&apos;s Store</title>
      </Head>
      <div className="text-center d-flex flex-column justify-content-center align-content-center">
        <br />
        <h1>Welcome to {seller_id.username}&apos;s Store</h1>
      </div>
      <div className="product-cards-container">
        {sellerProducts.map((product) => (
          <section key={`product--${product.id}`} className="seller-products">
            <ProductCard productObj={product} onUpdate={getAllSellerProducts} />
          </section>
        ))}
      </div>
    </>
  );
}
