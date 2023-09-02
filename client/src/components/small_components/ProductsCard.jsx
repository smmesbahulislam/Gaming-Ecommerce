import React from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import IconButton from '@mui/material/IconButton';
import './productsCard.css';
import { useCart } from '../../context/cart';
import { toast } from 'react-hot-toast';

const ProductsCard = (props) => {
    const [cart, setCart] = useCart();
    
    const handleAddToCart = () => {
        const existingProductIndex = cart.findIndex(item => item._id === props.product._id);

        if(existingProductIndex !== -1){
            //product already in cart, increase its quantity
            const updatedCart = [...cart];
            updatedCart[existingProductIndex].quantity += 1;
            setCart(updatedCart);
            localStorage.setItem('cart',JSON.stringify(updatedCart));
        }else{
            //Product not in cart add it with quantity 1
            setCart([...cart, {...props.product, quantity: 1}]);
            localStorage.setItem('cart',JSON.stringify([...cart,{...props.product,quantity: 1}]))
        }
        toast.success("Item Added to cart");
    }
    return (
        <>
            <div className="pro">
                <img src={props.picturePath} alt="" />
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

        </>
    )
}

export default ProductsCard