import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import ProductsCard from '../components/small_components/ProductsCard';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import IconButton from '@mui/material/IconButton';
import { useAuth } from '../context/auth';
import axios from 'axios';
import {  useNavigate } from 'react-router-dom';

const HomePage = () => {

  const [auth, setAuth] = useAuth();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-allProduct`);
      // console.log(data)
      setProducts(data.products)
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <section id="hero">
        <div class="left-column">
          <h4>STEAM STEALTH FEST</h4>
          <h2>Super Deal</h2>
          <h1>On all GAMES</h1>
          <p>Save more with coupons & up to 70% off!</p>
          <Button className='cta' endIcon={<AddShoppingCartIcon />} onClick={() => navigate('/products')}>
            Shop Now
          </Button>

          {/* <div>
            {JSON.stringify(auth,null,4)}
          </div> */}

        </div>
        <div className="right-column">
          <img className='heroSectionImg' src="/images/hero1.png" alt="" />
        </div>
      </section>

      <section id="feature" className='section-p1'>
        <div className='fe-box'>
          <div className='left_side_box'>
            <img className='shipping' src="./images/shipping.png" alt="" />
          </div>
          <div className='right_side_box'>
            <h4>Free Delivery</h4>
            <p>Free Shipping on all order</p>
          </div>
        </div>

        <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', width: "2px" }} />

        <div className='fe-box'>
          <div className='left_side_box'>
            <img className='shipping' src="./images/money_return.png" alt="" />
          </div>
          <div className='right_side_box'>
            <h4>Money Return</h4>
            <p>Back guarantee in 7 days</p>
          </div>
        </div>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', width: "2px" }} />
        <div className='fe-box'>
          <div className='left_side_box'>
            <img className='shipping' src="./images/member_discount.png" alt="" />
          </div>
          <div className='right_side_box'>
            <h4>Member Discount</h4>
            <p>On every order over $10</p>
          </div>
        </div>
        <Divider orientation="vertical" flexItem style={{ backgroundColor: 'black', width: "2px" }} />
        <div className='fe-box'>
          <div className='left_side_box'>
            <img className='shipping' src="./images/return_policy.png" alt="" />
          </div>
          <div className='right_side_box'>
            <h4>Return Policy</h4>
            <p>Support 24 hours a day</p>
          </div>
        </div>
      </section>

      <section id="product" className='section-p1'>
        <div className='headSection'>
          <h1>Our Products</h1>
          <div className='line'></div>
        </div>
        <div 
          className="pro-container"
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          {
            products?.slice(0,10).map((p) => (
              <ProductsCard
                key={p._id}
                product={p}
                picturePath={`${process.env.REACT_APP_API}/api/v1/product/get-productPhoto/${p._id}`}
                productName={p.name}
                productPrice={p.price}
              />
            ))
          }
          {/* <ProductsCard
            picturePath="/images/assassins_creed.png"
            productName="Assassins Creed 3"
            productPrice="$40.00"
          /> */}
          
        </div>


      </section>

      <section id="newsletter" className='section-p1'>
        <div className="newstext">
          <h4>Sign Up For Newsletters</h4>
          <p>Get E-mail updates about our latest shop and <span>special offers.</span></p>
        </div>
        <div className="form">
          <input type='text' placeholder='Your email address' />
          <IconButton className='sendButton' color="primary" aria-label="add to shopping cart">
            <SendRoundedIcon />
          </IconButton>
        </div>

      </section>
    </Layout>
  )
}

export default HomePage