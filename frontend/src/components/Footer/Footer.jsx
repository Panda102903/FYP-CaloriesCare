import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'
import { Link, useLocation, useNavigate } from 'react-router-dom'


const Footer = () => {
    const navigate = useNavigate()
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className='logo' src={assets.mascot} />
                    <p></p>
                    <div className="footer-social-icons">
                        <a href='https://www.facebook.com/greenwichculturesclub' target="_blank" rel="noopener noreferrer"><img src={assets.facebook_icon} /></a>
                        <a href='https://www.instagram.com/gicici_gredn' target="_blank" rel="noopener noreferrer"><img src={assets.instagram_icon} /></a>
                        <a href='https://www.tiktok.com/@greenwichculturesclub' target="_blank" rel="noopener noreferrer"><img src={assets.tiktok_icon} /></a>
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>DRANA RESTAURANT</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Privacy policy</li>

                        <li onClick={() => navigate('/myorders')} >Delivery</li>
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
                Copyright 2024 © dranarestaurant.com - All Right Reserved
            </p>
        </div>
    )
}

export default Footer
