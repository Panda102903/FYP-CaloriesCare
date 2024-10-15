import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link} from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext'

  const Navbar = ({setShowLogin}) => {

    const [menu,setMenu] = useState("home");

    const {getTotalCartAmount} = useContext(StoreContext)

    return (
      <div className='navbar'>
        <Link to='/'><img src={assets.logoRm} className="logo"/></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>Menu</a>
            <a href='#footer' onClick={() => setMenu("contact")} className={menu==="contact-us"?"active":""}>Contact Us</a>
            <a href='#' onClick={() => setMenu("privacy")} className={menu==="privacy"?"active":""}>Privacy</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search} className="search"/>
            <div className='navbar-search-icon'>
            <Link to='/cart'>
            <img src={assets.cart} className="cart"/>
            </Link> 
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            <button onClick={()=>setShowLogin(true)}>Sign in</button>
        </div>
      </div>
    )
  }
  
  export default Navbar
  