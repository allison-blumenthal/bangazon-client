/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleOrder } from '../../utils/data/orderData';
import { getOrderProductsByOrderId } from '../../utils/data/orderProductData';
import OrderProductCard from '../../components/orderProduct/OrderProductCard';

export default function ViewOrder() {
  const [orderDetails, setOrderDetails] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const router = useRouter();

  const { id } = router.query;

  const getOrderDetails = () => {
    getSingleOrder(id).then(setOrderDetails);
  };

  const getOrderProducts = () => {
    getOrderProductsByOrderId(id).then((products) => setOrderProducts(products));
  };

  useEffect(() => {
    getOrderDetails();
    getOrderProducts();
  }, []);

  return (
    <>
      <div className="order-details-page" />
      <Head>
        <title>Order Details</title>
      </Head>
      <div className="text-center d-flex flex-column justify-content-center align-content-center">
        <br />
        <h1>Order #:{orderDetails.id} from {orderDetails.date_placed}</h1>
      </div>
      <div className="product-cards-container">
        {orderProducts.map((orderProduct) => (
          <section key={`orderProduct--${orderProduct.id}`} className="order-products">
            <OrderProductCard orderProdcutObj={orderProduct} onUpdate={getOrderProducts} />
          </section>
        ))}
      </div>
    </>
  );
}
