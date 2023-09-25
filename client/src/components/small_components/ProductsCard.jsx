import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import React, { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useCart } from '../../context/cart';
import './productsCard.css';
import ProductDetailsDialog from '../ProductDetailsAndReviewSystem/ProductDetailsDialog';

const ProductsCard = (props) => {
    const [cart, setCart] = useCart();
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [picturePath, setpicturePath] = useState(null);

    // const handleOpen = () => {
    //     setOpen(true);
    // }
    const handleClose = () => {
        setSelectedProduct(null);
        setOpen(false);
    }

    const handleCardClick = useCallback((product, picturePath) => {
        setSelectedProduct(product)
        setpicturePath(picturePath);
        console.log(product)
        setOpen(true)
    }, [])




    const handleAddToCart = () => {
        const existingProductIndex = cart.findIndex(item => item._id === props.product._id);

        if (existingProductIndex !== -1) {
            //product already in cart, increase its quantity
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            //Product not in cart add it with quantity 1
            setCart([...cart, { ...props.product, quantity: 1 }]);
            localStorage.setItem('cart', JSON.stringify([...cart, { ...props.product, quantity: 1 }]))
        }
        toast.success("Item Added to cart");
    }
    return (
        <>
            <div  className="pro">
                <div onClick={() => handleCardClick(props.product, props.picturePath)} className="productImage">
                    <img src={props.picturePath} alt="" />
                </div>
                <div className="des">
                    <h5>{props.productName}</h5>
                    <div className="star">
                        <StarIcon style={{ color: "gold", fontSize: "20px" }} />
                        <StarIcon style={{ color: "gold", fontSize: "20px" }} />
                        <StarIcon style={{ color: "gold", fontSize: "20px" }} />
                        <StarIcon style={{ color: "gold", fontSize: "20px" }} />
                        <StarIcon style={{ color: "gold", fontSize: "20px" }} />
                    </div>
                    <h4>${props.productPrice}</h4>
                    {/* <Link to='/single' state={{rowData: props}}> */}
                    {/* <IconButton className='cart' color="primary" aria-label="add to shopping cart" onClick={() => {
                        setCart([...cart, props.product]);
                        localStorage.setItem('cart',JSON.stringify([...cart,props.product]))
                        toast.success("Item Added to cart");
                    }}> */}
                    <IconButton className='cart' color="primary" aria-label="add to shopping cart" onClick={handleAddToCart}>
                        <AddShoppingCartIcon />
                    </IconButton>
                    {/* </Link> */}


                </div>
            </div>

            {/* {
                open === true? <ProductDetailsDialog open={open} setOpen={setOpen} handleClose={handleClose} product={selectedProduct} /> : ''
            } */}
            <ProductDetailsDialog open={open} setOpen={setOpen} handleClose={handleClose} product={selectedProduct} productPhoto = {picturePath} />

        </>
    )
}

export default ProductsCard