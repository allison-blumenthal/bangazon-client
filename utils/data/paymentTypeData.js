import { clientCredentials } from '../client';

const getPaymentTypes = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSinglePaymentType = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data)) // will resolve a single object
    .catch(reject);
});

const createPaymentType = (paymentType) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentType),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePaymentType = (paymentType) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes/${paymentType.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paymentType),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const deletePaymentType = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/paymenttypes/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getPaymentTypes, getSinglePaymentType, createPaymentType, updatePaymentType, deletePaymentType,
};
