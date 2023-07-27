import { clientCredentials } from '../client';

const getOrderProducts = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleOrderProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const createOrderProduct = (orderProduct) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderProduct),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateOrderProduct = (orderProduct) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts/${orderProduct.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderProduct),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteOrderProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

const getOrderProductsByOrderId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orderproducts?order_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getOrderProducts, getSingleOrderProduct, createOrderProduct, updateOrderProduct, deleteOrderProduct, getOrderProductsByOrderId,
};
