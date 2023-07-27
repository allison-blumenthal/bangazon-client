/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import OrderCard from '../../components/order/OrderCard';
import { getOrdersBySellerId } from '../../utils/data/orderData';
import { useAuth } from '../../utils/context/authContext';

export default function OrderHistory() {
  const [userOrders, setUserOrders] = useState([]);
  const { user } = useAuth();

  const getAllUserOrders = () => {
    getOrdersBySellerId(user.id).then((orders) => setUserOrders(orders));
  };

  useEffect(() => {
    getAllUserOrders();
  }, []);

  return (
    <>
      <div className="order-history-page" />
      <Head>
        <title>{user.username}&apos;s Orders</title>
      </Head>
      <div className="text-center d-flex flex-column justify-content-center align-content-center">
        <br />
        <h1>{user.username}&apos;s Orders</h1>
      </div>
      <div className="order-cards-container">
        {userOrders.map((order) => (
          <section key={`order--${order.id}`} className="user-orders">
            <OrderCard orderObj={order} onUpdate={getAllUserOrders} />
          </section>
        ))}
      </div>
    </>
  );
}
