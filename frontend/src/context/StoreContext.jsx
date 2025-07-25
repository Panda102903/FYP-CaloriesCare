import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:4000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const [discount, setDiscount] = useState(0);
  const [promoCodes, setPromoCodes] = useState({
    SAVE10: 10,
    SAVE20: 20,
    FREESHIP: -2,
  });

  const clearCart = () => {
    setCartItems({});
  };

  const addToCart = async (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { token } }
    );
    setCartItems(response.data.cartData);
  };

  const applyPromoCode = (code) => {
    const matchedDiscount = promoCodes[code.toUpperCase()];
    if (matchedDiscount) {
      setDiscount(matchedDiscount);
      return {
        success: true,
        message: `Promo code applied! You get ${
          matchedDiscount > 0 ? matchedDiscount + "%" : "Free Shipping"
        }.`,
      };
    } else {
      setDiscount(0);
      return { success: false, message: "Invalid promo code!" };
    }
  };

  const calculateFinalTotal = () => {
    const total = getTotalCartAmount();
    const discountAmount = discount > 0 ? (total * discount) / 100 : 0;
    const deliveryFee = discount === -2 ? 0 : total === 0 ? 0 : 2;
    return total - discountAmount + deliveryFee;
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    applyPromoCode,
    calculateFinalTotal,
    discount,
    url,
    token,
    setToken,
    clearCart,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
