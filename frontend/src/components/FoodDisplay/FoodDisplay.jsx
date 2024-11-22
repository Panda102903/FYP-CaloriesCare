import React, { useContext, useState } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = () => {
  const { food_list } = useContext(StoreContext);
  const [searchTerm, setSearchTerm] = useState(''); // State lưu trữ từ khóa tìm kiếm
  const [selectedCategory, setSelectedCategory] = useState('All'); // State lưu trữ danh mục đã chọn

  const handleSearch = (event) => {
    setSearchTerm(event.target.value); // Cập nhật từ khóa
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Cập nhật danh mục
  };

  const filteredFoods = food_list.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="filters">
        <input
          type="text"
          placeholder="Search food..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="category-select"
        >
          <option value="All">All</option>
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
      </div>
      
      <div className="food-display-list">
        {filteredFoods.map((item, index) => (
          <FoodItem
            key={index}
            id={item._id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
        {filteredFoods.length === 0 && <p>No items found.</p>}
      </div>
    </div>
  );
};

export default FoodDisplay;
