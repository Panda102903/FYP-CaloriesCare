import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

  const Navbar = () => {
    return (
      <div className='navbar'>
        <img src={assets.ava_panda}/>
        <ul className="navbar-menu">
            <li>home</li>
            <li>menu</li>
            <li>contact</li>
            <li>privacy</li>
        </ul>
        <div className="navbar-right">
            <li>search-icon</li>
            <div className='navbar-search-icon'>
                <img/>
                <div className='dot'></div>
            </div>
            <button>sign in</button>
        </div>
      </div>
    )
  }
  
  export default Navbar
  