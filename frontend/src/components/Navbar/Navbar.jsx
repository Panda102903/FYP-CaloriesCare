import React, { useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

  const Navbar = () => {

    const [menu,setMenu] = useState("home");

    return (
      <div className='navbar'>
        <img src={assets.ava_panda} className="logo"/>
        <ul className="navbar-menu">
            <li onClick={() => setMenu("home")} className={menu==="home"?"active":""}>home</li>
            <li onClick={() => setMenu("menu")} className={menu==="menu"?"active":""}>menu</li>
            <li onClick={() => setMenu("contact")} className={menu==="contact"?"active":""}>contact</li>
            <li onClick={() => setMenu("privacy")} className={menu==="privacy"?"active":""}>privacy</li>
        </ul>
        <div className="navbar-right">
            <img/> {/* search icon */}
            <div className='navbar-search-icon'>
            <img/> {/*Shopping cart icon */}
                <div className='dot'></div>
            </div>
        
            <button>sign in</button>
        </div>
      </div>
    )
  }
  
  export default Navbar
  