// import React, { useContext } from 'react'
// import './Cart.css'
// import { StoreContext } from '../../context/StoreContext'
// import { useNavigate } from 'react-router-dom';
// const Cart = () => {

//   const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);

//   const navigate = useNavigate();

//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item, index) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div>
//                 <div className="cart-items-title cart-items-item">
//                   <img src={url + "/images/" + item.image} />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>${item.price * cartItems[item._id]}</p>
//                   <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
//                 </div>
//                 <hr />
//               </div>
//             )
//           }
//         })}
//       </div>
//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
//             </div>
//             <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>
//         <div className="cart-promocode">
//           <div>
//             <p>If you have a promo code, Enter it here</p>
//             <div className="cart-promo-input">
//               <input type="text" placeholder='Promo code' />
//               <button>Submit</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//   )
// }

// export default Cart

// import React, { useContext, useState } from 'react';
// import './Cart.css';
// import { StoreContext } from '../../context/StoreContext';
// import { useNavigate } from 'react-router-dom';

// const Cart = () => {
//   const { 
//     cartItems, 
//     food_list, 
//     removeFromCart, 
//     getTotalCartAmount, 
//     applyPromoCode, 
//     calculateFinalTotal, 
//     discount, 
//     url 
//   } = useContext(StoreContext);

//   const navigate = useNavigate();
//   const [promoCode, setPromoCode] = useState("");
//   const [popupMessage, setPopupMessage] = useState({ visible: false, message: "", type: "" });


//   return (
//     <div className='cart'>
//       <div className="cart-items">
//         <div className="cart-items-title">
//           <p>Items</p>
//           <p>Title</p>
//           <p>Price</p>
//           <p>Quantity</p>
//           <p>Total</p>
//           <p>Remove</p>
//         </div>
//         <br />
//         <hr />
//         {food_list.map((item) => {
//           if (cartItems[item._id] > 0) {
//             return (
//               <div key={item._id}>
//                 <div className="cart-items-title cart-items-item">
//                   <img src={url + "/images/" + item.image} alt={item.name} />
//                   <p>{item.name}</p>
//                   <p>${item.price}</p>
//                   <p>{cartItems[item._id]}</p>
//                   <p>${item.price * cartItems[item._id]}</p>
//                   <p onClick={() => removeFromCart(item._id)} className="cross">x</p>
//                 </div>
//                 <hr />
//               </div>
//             );
//           }
//         })}
//       </div>

//       <div className="cart-bottom">
//         <div className="cart-total">
//           <h2>Cart Totals</h2>
//           <div>
//             <div className="cart-total-details">
//               <p>Subtotal</p>
//               <p>${getTotalCartAmount()}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Discount</p>
//               <p>{discount > 0 ? `-${discount}%` : discount === -2 ? "Free Shipping" : "$0"}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <p>Delivery Fee</p>
//               <p>${discount === -2 ? 0 : (getTotalCartAmount() === 0 ? 0 : 2)}</p>
//             </div>
//             <hr />
//             <div className="cart-total-details">
//               <b>Total</b>
//               <b>${calculateFinalTotal()}</b>
//             </div>
//             <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
//           </div>
//         </div>

//       </div>

//       {popupMessage.visible && (
//         <div className={`popup-message ${popupMessage.type}`}>
//           {popupMessage.message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;


import React, { useContext, useState } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup/Popup';

const Cart = () => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    getTotalCartAmount,
    applyPromoCode,
    calculateFinalTotal,
    discount,
    url,
    token,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleCheckout = () => {
    if (!token) {
      // Hiển thị popup nếu chưa đăng nhập
      setShowPopup(true);
    } else {
      navigate('/order');
    }
  };
    // Scroll to top function
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth', // Smooth scrolling effect
      });
    };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id}>
                <div className="cart-items-title cart-items-item">
                  <img src={url + '/images/' + item.image} alt={item.name} />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className="cross">
                    x
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Discount</p>
              <p>
                {discount > 0 ? `-${discount}%` : discount === -2 ? 'Free Shipping' : '$0'}
              </p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${discount === -2 ? 0 : getTotalCartAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>${calculateFinalTotal()}</b>
            </div>
            <button onClick={function(event){ handleCheckout(); scrollToTop()}}>PROCEED TO CHECKOUT</button>
           
          </div>
        </div>
      </div>

      {showPopup && (
        <Popup
          message="Please log in to proceed with checkout."
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default Cart;
