import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'


const Navbar = ({ setShowLogin }) => {

  const [menu, setMenu] = useState("home");

  const { getTotalCartAmount, token, setToken, clearCart } = useContext(StoreContext)

  const navigate = useNavigate()
  const location = useLocation()

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    clearCart();
    navigate("/")
  }

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling effect
    });
  };


  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} className="logo" /></Link>

      {/* <Link to='/'><p>Drana Restaurant</p></Link> */}
      <ul className="navbar-menu">
        <li onClick={scrollToTop}>
        <Link  to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>
          Home
        </Link>
        </li>
        <li
          onClick={() => {
            setMenu("menu");
            if (location.pathname !== "/") {
              navigate("/");
              setTimeout(() => {
                const section = document.querySelector("#food-display");
                section && section.scrollIntoView({ behavior: "smooth" });
              }, 300);
            } else {
              const section = document.querySelector("#food-display");
              section && section.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={menu === "menu" ? "active" : ""}
        >
          Menu

        </li>
        <li
          onClick={() => {
            setMenu("contact");
            const section = document.querySelector("#footer");
            section && section.scrollIntoView({ behavior: "smooth" });
          }}
          className={menu === "contact-us" ? "active" : ""}
        >
          Contact Us
        </li>
        <li
          onClick={() => setMenu("privacy")}
          className={menu === "privacy" ? "active" : ""}
        >
          Privacy
        </li>
      </ul>

      <div className="navbar-right">

        <div className='navbar-search-icon'>
          <Link to='/cart' onClick={scrollToTop}>
            <img src={assets.cart} className="cart" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {
          !token ? <button onClick={() => setShowLogin(true)}>Sign in</button>
            : <div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
                <li onClick={() => navigate('/myorders')}>
                  <img src={assets.bag_icon} alt="" />
                  <p onClick={scrollToTop}>Orders</p>
                </li>
                <hr />
                <li onClick={logout}>
                  <img src={assets.logout_icon} alt="" />
                  <p>Logout</p>
                </li>
              </ul>
            </div>
        }

      </div>
    </div>
  )
}

export default Navbar
