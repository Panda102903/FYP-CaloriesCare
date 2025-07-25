import React, { useContext, useState } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import Popup from '../Popup/Popup';

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url, token } = useContext(StoreContext);

  const [showPopup, setShowPopup] = useState(false);

  // Handle adding to cart
  const handleAddToCart = (id) => {
    if (!token) {
      setShowPopup(true);
      return;
    }
    addToCart(id);
  };

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={`${url}/images/${image}`} alt={name} />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => handleAddToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove from cart"
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => handleAddToCart(id)}
              src={assets.add_icon_green}
              alt="Add to cart"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">{price} vnd</p>
      </div>


      {showPopup && (
        <Popup
          message="Please sign in to add items to your cart."
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default FoodItem;
