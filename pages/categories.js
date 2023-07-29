import React, { useState } from 'react';
import { getCategories } from '../utils/data/categoryData';
import CategoryCard from '../components/category/CategoryCard';

export default function ViewCategories() {
  const [categories, setCategories] = useState([]);

  const getCategoryList = () => {
    getCategories().then((data) => {
      setCategories(data);
    });
  };

  return (
    <div>
      <br />
      <h1>Product Categories</h1>
      <div className="category-list-container">
        {categories.map((category) => (
          <section key={`category--${category.id}`} className="categories">
            <CategoryCard categoryObj={category} onUpdate={getCategoryList} />
          </section>
        ))}
      </div>
    </div>
  );
}
