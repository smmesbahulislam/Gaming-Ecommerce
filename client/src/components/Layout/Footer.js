import React from 'react'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import IconButton from '@mui/material/IconButton';
import { NavLink } from 'react-router-dom';




const Footer = () => {
  return (
    <div id='container'>
      <footer className='section-p1'>
        <div className="col">
          <img className='logo' src={`${process.env.PUBLIC_URL}/images/storeLogo.png`} alt="" />
          <h4>Contact</h4>
          <p><strong>Address: </strong>85-Topobon Abashik Elaka,Sylhet</p>
          <p><strong>Phone: </strong>01731905669</p>
          <p><strong>Hours: </strong>10:00 - 18:00, Mon - Sat</p>

          <div className="follow">
            <h4>Follow us</h4>
            <div className="icon">
              <IconButton className='socialMedia' color="primary" aria-label="add to shopping cart">
                <FacebookOutlinedIcon />
              </IconButton>
              <IconButton className='socialMedia' color="primary" aria-label="add to shopping cart">
                <TwitterIcon />
              </IconButton>
              <IconButton className='socialMedia' color="primary" aria-label="add to shopping cart">
                <InstagramIcon />
              </IconButton>
              <IconButton className='socialMedia' color="primary" aria-label="add to shopping cart">
                <YouTubeIcon />
              </IconButton>
            </div>
          </div>
        </div>

        {/* <div className="col">
          <h4>About</h4>
          <a href="#">About us</a>
          <a href="#">Delivery Information</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Term & Conditions</a>
          <a href="#">Contact Us</a>
        </div> */}

        <div className="col">
          <h4>My Account</h4>
          {/* <a href="#">Sign In</a> */}
          <NavLink to={'/login'}>Sign In</NavLink>
          <NavLink to={"/cart"}>View Cart</NavLink>
          {/* <a href="#">My Wishlist</a> */}
          <NavLink href="/">Track My Order</NavLink>
          {/* <a href="#">Help</a> */}
        </div>

        <div className="col install">
          <h4>Install App</h4>
          <p>From App Store or Google Play</p>
          <div className="row">
            <img src={`${process.env.PUBLIC_URL}/images/app.jpg`} alt="" />
            <img src={`${process.env.PUBLIC_URL}/images/play.jpg`} alt="" />
          </div>
          <p>Secured Payment Gateways</p>
          <img src={`${process.env.PUBLIC_URL}/images/pay.png`} alt="" />
        </div>

        <div className="copyright">
          <p>© 2023, Mesbah - Webtech Ecommerce Project using MERN</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer