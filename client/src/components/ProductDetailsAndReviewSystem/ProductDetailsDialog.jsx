import {
  Dialog,
  DialogContent,
  Grid,
  Divider,
  TextField,
  Button,
  InputAdornment,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import CompareIcon from '@mui/icons-material/Compare';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import LocalMallSharpIcon from '@mui/icons-material/LocalMallSharp';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import React, { useState } from 'react';
import { useCart } from '../../context/cart';
import './ProductDetailsDialog.css';

const ProductDetailsDialog = ({ open, handleClose, product, productPhoto }) => {
  const [cart, setCart] = useCart();
  const [value, setValue] = useState(1);
  // const [availability, setAbailability] = useState(true);

  const handleAddToCartClick = (productId) => {
    const updatedCart = [...cart];
    //first check wheather the item exist in the cart or not
    let existingItem = cart.findIndex((item) => item._id === productId);

    if(existingItem !== -1){
      //if exist then update the quantity
      updatedCart[existingItem].quantity = value;
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }else{
      //else add the item to the cart with the given quantity
      updatedCart.push({...product, quantity: value});
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  }

  const handleIncrease = () => {
    setValue(value + 1);
  };

  const handleDecrease = () => {
    if (value > 1) {
      setValue(value - 1);
    }
  };
  return (
    <Dialog onClose={handleClose} open={open} maxWidth='lg' classes={{ paper: 'productDetailsDialog' }}>
      {/* <DialogTitle>{product?.name}</DialogTitle> */}
      <DialogContent>
        <Grid container spacing={-2}>
          <div className="productDetails">
            <Grid item xs={4}>
              <div className="productImage">
                <img src={productPhoto} alt='ProductImage' />
              </div>
            </Grid>
            <Grid item xs={8}>

              <div className="productDetailsInformation">
                <div className="productName">{product?.name}</div>
                <div className="productPrice">${product?.price}</div>
                <div className="productDescription">{product?.description}</div>
                <Divider 
                  sx={{
                    borderColor: 'rgba(0, 0, 0, 0.52)',
                    width: '100%',
                  }}
                />
                <div className="productInfo">
                  <div className="type">
                    <label className='typeName'>Category</label>
                    <p>: {product?.category}</p>
                  </div>
                  <div className="type">
                    <label className='typeName'>Availability</label>
                    <p>: {product?.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>
                  </div>
                  <div className="type">
                    <label className='typeName'>Tags</label>
                    <p>: {product?.category}</p>
                  </div>
                </div>

                <div className='quantityAndBuySection'>
                  <label className='typeName'>Quantity</label>
                  <TextField
                    type="number"
                    variant="outlined"
                    value={value}
                    inputProps={{ style: { textAlign: 'center'} }}
                    InputProps={{
                      readOnly: true,
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="decrease"
                            onClick={handleDecrease}
                            edge="end"
                            sx={{ mr: 1 }}
                          >
                            <RemoveIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="increase"
                            onClick={handleIncrease}
                            edge="end"
                          >
                            <AddIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      width: '150px',
                    }}
                  />
                  {/* give me two button add to cart and buy it now*/}
                  <Button variant="contained" onClick={() => handleAddToCartClick(product?._id)} endIcon={<AddShoppingCartSharpIcon />} classes={{root: 'addToCartButton'}}>
                    Add To Cart
                  </Button>
                  <Button variant="contained" endIcon={<LocalMallSharpIcon />} classes={{root: 'buyItNowButton'}}>
                    Buy It Now
                  </Button>
                </div>
                <div className="wishlistAndCompareSection">
                  <Button variant="text" startIcon={<FavoriteBorderIcon />} classes={{root: 'addToWishlistButton'}}>Add To Wishlist</Button>
                  <Button variant="text" startIcon={<CompareIcon />} classes={{root: 'addToWishlistButton'}}>Add To Compare</Button>
                </div>

              </div>

            </Grid>

          </div>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default ProductDetailsDialog;
