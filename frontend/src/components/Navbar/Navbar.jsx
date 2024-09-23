import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

  const Navbar = () => {

    const [menu,setMenu] = useState("home");

    return (
      <div className='navbar'>
        <img src={assets.logoRm} className="logo"/>
        <ul className="navbar-menu">
            <li onClick={() => setMenu("home")} className={menu==="home"?"active":""}>Home</li>
            <li onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>Menu</li>
            <li onClick={() => setMenu("contact")} className={menu==="contact"?"active":""}>Contact</li>
            <li onClick={() => setMenu("privacy")} className={menu==="privacy"?"active":""}>Privacy</li>
        </ul>
        <div className="navbar-right">
            <img src={assets.search} className="search"/> {/* search icon */}
            <div className='navbar-search-icon'>
            <img src={assets.cart} className="cart"/> {/*Shopping cart icon */}
                <div className='dot'></div>
            </div>
        
            <button>sign in</button>
        </div>
      </div>
    )
  }
  
  export default Navbar
  