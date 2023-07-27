import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../utils/context/authContext';
import { getOpenOrderByUserId } from '../../utils/data/orderData';
import { getOrderProductsByOrderId } from '../../utils/data/orderProductData';
import CartItemCard from '../../components/cart/CartItemCard';

export default function ViewCart() {
  const [openOrder, setOpenOrder] = useState({});
  const [cartProducts, setCartProducts] = useState({});
  const { user } = useAuth();

  const getOpenOrder = () => {
    getOpenOrderByUserId(user.id).then(setOpenOrder);
  };

  const getCartProducts = async () => {
    try {
      const products = await getOrderProductsByOrderId(openOrder.id);
      setCartProducts(products);
    } catch (error) {
      console.error('Error fetching cart products: ', error);
    }
  };

  useEffect(() => {
    getOpenOrder();
    getCartProducts();
  }, []);

  return (
    <>
      <div className="cart-page" />
      <Head>
        <title>Cart</title>
      </Head>
      <div className="text-center d-flex flex-column justify-content-center align-content-center">
        <br />
        <h1>My Cart</h1>
      </div>
      <div className="cart-items-container">
        {cartProducts.map((cartProduct) => (
          <section key={`cartProduct--${cartProduct.id}`} className="order-products">
            <CartItemCard cartItemObj={cartProduct} onUpdate={getCartProducts} />
          </section>
        ))}
      </div>
      <br />
      <h1>Order total: $(tbd)</h1>
    </>
  );
}
