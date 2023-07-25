/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import ProductCard from '../components/product/ProductCard';
import { getProducts } from '../utils/data/productData';

function Home() {
  const [sortedProducts, setSortedProducts] = useState([]);

  const getRecentProducts = async () => {
    try {
      const products = await getProducts();
      const sorted = [...products].sort((a, b) => b.timestamp - a.timestamp);
      setSortedProducts(sorted.slice(-20));
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  useEffect(() => {
    getRecentProducts();
  }, []);

  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
      >
        <br />
        <h1>Newest Products</h1>
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
