/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../utils/data/productData';

function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const getRecentProducts = () => {
    getProducts().then((productArr) => {
      setProducts(productArr.slice(-20));
      if (products) {
        const sorted = [...products].sort((a, b) => b.timestamp - a.timestamp);
        setSortedProducts(sorted);
      }
    });
  };

  useEffect(() => {
    getRecentProducts();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '30vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Welcome to Bangazon, {user.username}! </h1>
        <img src={user.profile_image_url} alt="user profile" />
      </div>
      <div className="product-cards-container">
        {sortedProducts
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .map((product) => (
            <section key={`product--${product.id}`} className="products">
              <ProductCard productObj={product} onUpdate={getRecentProducts} />
            </section>
          ))}
      </div>
    </>
  );
}

export default Home;
