// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { useAuth } from '../../utils/context/authContext';

// function CartCheckoutForm({ orderObj }) {
//   const [currentOrder, setCurrentOrder] = useState({});
//   const [orderProducts, setOrderProducts] = useState([]);
//   const { user } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (orderObj.id) {
//       setCurrentOrder({
//         id: orderObj.id,
//         customerId: orderObj.customer_id,
//         paymentType: orderObj.payment_type,
//         total: orderObj.total,

//       });
//     }
//   });

//   return (
//     <div />
//   );
// }

// CartCheckoutForm.propTypes = {
//   orderObj: PropTypes.shape({
//     id: PropTypes.number,
//     customer_id: PropTypes.number,
//     payment_type: PropTypes.shape({
//       id: PropTypes.number,
//       label: PropTypes.string,
//     }),
//     total: PropTypes.number,
//     needs_shipping: PropTypes.bool,
//     is_completed: PropTypes.bool,
//     date_placed: PropTypes.instanceOf(Date),
//   }).isRequired,
// };

// export default CartCheckoutForm;
