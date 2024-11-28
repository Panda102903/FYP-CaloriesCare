import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className='logo' src={assets.logoRm} />
                    <p></p>
                    <div className="footer-social-icons">
                        <a href='https://www.facebook.com/greenwichculturesclub' target="_blank" rel="noopener noreferrer"><img src={assets.facebook_icon} /></a>
                        <a href='https://www.instagram.com/gicici_gredn' target="_blank" rel="noopener noreferrer"><img src={assets.instagram_icon} /></a>
                        <a href='https://www.tiktok.com/@greenwichculturesclub' target="_blank" rel="noopener noreferrer"><img src={assets.tiktok_icon} /></a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>CALORIE CARE</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Privacy policy</li>
                        <li>Delivery</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+84 948 043 778</li>
                        <li>gcc.gredn@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className="footer-copyright">
                Copyright 2024 © CalorieCare.com - All Right Reserved
            </p>
        </div>
    )
}

export default Footer
