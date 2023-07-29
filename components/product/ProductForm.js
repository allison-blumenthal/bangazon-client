// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import { Button, Form } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { getCategories } from '../../utils/data/categoryData';
// import { createProduct, updateProduct } from '../../utils/data/productData';

// const getTodaysDate = () => {
//   const today = new Date();

//   const formattedDate = today.toLocaleString('en-CA', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   });

//   return formattedDate;
// };

// const todayDate = getTodaysDate();

// const initialState = {
//   sellerId: 0,
//   name: '',
//   description: '',
//   price: 0.00,
//   quantity: 0,
//   productImageUrl: '',
//   addedOn: todayDate,
//   categoryId: 0,
// };

// function ProductForm({ productObj }) {
//   const [currentProduct, setCurrentProduct] = useState(initialState);
//   const [categories, setCategories] = useState([]);
//   const router = useRouter();
//   const { user } = useAuth();

//   useEffect(() => {
//     getCategories().then((data) = () => {
//       setCategories(data)});

//     if (productObj.id) {
//       setCurrentProduct({
//         id: productObj.id,
//         sellerId: productObj.seller_id.id,
//         name: productObj.name,
//         description: productObj.description,
//         price: productObj.price,
//         quantity: productObj.quantity,
//         productImageUrl: productObj.product_image_url,
//         addedOn: productObj.added_on,
//         categoryId: productObj.category_id.id,
//       });
//     }
//   }, [productObj]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentProduct((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (productObj.id) {
//       const updatedProduct = {
//         id: currentProduct.id,
//         sellerId: Number(currentProduct.sellerId),
//         name: currentProduct.name,
//         description: currentProduct.description,
//         price: Number(currentProduct.price),
//         quantity: Number(currentProduct.quantity),
//         productImageUrl: currentProduct.productImageUrl,
//         addedOn: currentProduct.addedOn,
//         categoryId: Number(currentProduct.categoryId),
//       };
//       updateProduct(updatedProduct).then(() => router.push('/products'));
//     } else {
//       const product = {
//         sellerId: user.id,
//         name: currentProduct.name,
//         description: currentProduct.description,
//         price: Number(currentProduct.price),
//         quantity: Number(currentProduct.quantity),
//         productImageUrl: currentProduct.productImageUrl,
//         addedOn: currentProduct.addedOn,
//         categoryId: Number(currentProduct.categoryId),
//       };
//       createProduct(product).then(() => router.push('/products'));
//     }
//   };

//   return (
//     <div>

//     </div>
//   )
// }

// export default ProductForm;
