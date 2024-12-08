// import React, { useCallback, useContext, useEffect, useState } from 'react'
// import './LoginPopup.css'
// import { assets } from '../../assets/assets'
// import { StoreContext } from '../../context/StoreContext'
// import axios from "axios"

// const LoginPopup = ({ setShowLogin }) => {

//   const { url, setToken, setCartItems } = useContext(StoreContext)

//   const [currState, setCurrState] = useState("Login")
//   const [data, setData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   })

//   const onChangeHandler = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;
//     setData(data => ({ ...data, [name]: value }))
//   }


//   const onLogin = async (event) => {
//     event.preventDefault()
//     let newUrl = url;
//     if (currState === "Login") {
//       newUrl += "/api/user/login"
//     }
//     else {
//       newUrl += "/api/user/register"
//     }

//     const response = await axios.post(newUrl, data);

//     if (response.data.success) {
//       setToken(response.data.token);
//       localStorage.setItem("token", response.data.token);


//       // Lấy dữ liệu giỏ hàng từ server
//       try {
//         const cartResponse = await axios.post(
//           `${url}/api/cart/get`,
//           {},
//           { headers: { token: response.data.token } }
//         );

//         if (cartResponse.data.success) {
//           // Lưu dữ liệu giỏ hàng vào context
//           setCartItems(cartResponse.data.cartData || {});
//         } else {
//           console.error("Failed to load cart data:", cartResponse.data.message);
//         }
//       } catch (error) {
//         console.error("Error fetching cart data:", error);
//       }


//       setShowLogin(false)
//     }
//     else {
//       alert(response.data.message)
//     }
//   }



//   return (
//     <div className='login-popup'>
//       <form onSubmit={onLogin} className='login-popup-container'>
//         <div className='login-popup-title'>
//           <h2>{currState}</h2>
//           <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
//         </div>
//         <div className="login-popup-inputs">
//           {currState === "Login" ? <></> : <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your Name' required />}
//           <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your Email' required />
//           <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Password' required />
//         </div>
//         <button type='submit'>{currState === "Sign Up" ? "Create account" : "Login"}</button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, I agree to the terms of use & privacy policy.</p>
//         </div>
//         {currState === "Login"
//           ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click here</span></p>
//           : <p>Already have an account? <span onClick={() => setCurrState("Login")}>Login here</span></p>
//         }
//       </form>
//     </div>
//   )
// }

// export default LoginPopup


import React, { useContext, useEffect, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const { url, setToken, setCartItems } = useContext(StoreContext);

  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }

    try {
      const response = await axios.post(newUrl, data);

      if (response.data.success) {
        setSuccessMessage(
          currState === "Login"
            ? "Login successful! Welcome back!"
            : "Sign Up successful! You can now log in."
        );
        setErrorMessage("");
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);

        // Lấy dữ liệu giỏ hàng từ server
        if (currState === "Login") {
          const cartResponse = await axios.post(
            `${url}/api/cart/get`,
            {},
            { headers: { token: response.data.token } }
          );
          setCartItems(cartResponse.data.cartData || {});
        }

        setTimeout(() => {
          setShowLogin(false);
        }, 2000);
      } else {
        setErrorMessage(response.data.message);
        setSuccessMessage("");
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMessage(
          currState === "Sign Up" ? "Email already exists." : "Invalid email or password."
        );
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      setSuccessMessage("");
    }
  };


  // Tự động xóa message sau 3 giây
  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);


  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Your Name"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Password"
            required
          />
        </div>

        {currState === "Sign Up" ? (
          <div className="login-popup-condition">
            <input type="checkbox" required />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
        ) : (
          <div className="login-popup-condition">
          </div>
        )}

        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>

        {/* {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>} */}

        {errorMessage && (
          <div className="message error">
            <p>{errorMessage}</p>
            <span onClick={() => setErrorMessage("")}>&times;</span>
          </div>
        )}

        {successMessage && (
          <div className="message success">
            <p>{successMessage}</p>
            <span onClick={() => setSuccessMessage("")}>&times;</span>
          </div>
        )}

        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
