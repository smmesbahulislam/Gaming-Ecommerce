import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useAuth } from '../../context/auth';
import LogoutIcon from '@mui/icons-material/Logout';
import toast from 'react-hot-toast';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useCart } from '../../context/cart';
// import Dashboard from '../../pages/User/Dashboard';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


const Header = () => {
    const [auth, setAuth] = useAuth();
    const [cart] = useCart();
    const navigate = useNavigate();


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const handleLogout = () => {
        setAuth({
            ...auth,
            user: null,
            token: ''
        })
        localStorage.removeItem('auth');
        toast.success('Logout Successfully.');
        navigate('/');
    }
    const handleLogoutClick = () => {
        handleClose();
        handleLogout();
    }
    const handleDashboardClick = () => {
        handleClose();
        if (auth?.user?.role === 1) {
            navigate('/dashboard/admin')
        }
        else if(auth?.user?.role === 2){
            navigate('/supplier/order-info')
        }
        else {
            navigate('/dashboard/user')
        }
        // navigate('/dashboard');
    }
    const handleProfileClick = () => {
        handleClose();
    }

    return (
        <>
            <section id="header">
                <Link to="/"><img src={`${process.env.PUBLIC_URL}/images/storeLogo.png`} className='logo' alt='' /></Link>
                <div>
                    <ul id="navbar">
                        <li><NavLink to="/" >Home</NavLink></li>
                        <li><NavLink to="/products">Shop</NavLink></li>
                        <li><NavLink to="/blogs">Blog</NavLink></li>
                        {
                            !auth.user ?
                                (
                                    <>
                                        <li><NavLink to="/login">Login</NavLink></li>
                                        <li><NavLink to="/register">Sign Up</NavLink></li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {/* <li><NavLink onClick={handleLogout}>Log Out</NavLink></li> */}
                                        <li>
                                            <Button
                                                id="basic-button"
                                                aria-controls={open ? 'basic-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                onClick={handleClick}
                                            >
                                                {auth?.user?.name}
                                            </Button>
                                            <Menu
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                    'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                <MenuItem>
                                                    <Button onClick={handleProfileClick} startIcon={<AccountCircleIcon />}>Profile</Button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <Button onClick={handleDashboardClick} startIcon={<DashboardIcon />}>Dashboard</Button>
                                                </MenuItem>
                                                <MenuItem>
                                                    <Button onClick={handleLogoutClick} startIcon={<LogoutIcon />}>LogOut</Button>
                                                </MenuItem>
                                            </Menu>
                                        </li>
                                        {/* <li><Button href="#text-buttons" onClick={handleLogout} endIcon={<LogoutIcon />}>LogOut</Button></li> */}

                                    </>
                                )
                        }

                        {
                            ![1, 2].includes(auth?.user?.role) && (
                                <li>
                                    <NavLink to="/cart">
                                        <StyledBadge badgeContent={cart?.length} color="secondary">
                                            <ShoppingCartIcon />
                                        </StyledBadge>
                                    </NavLink>
                                </li>
                            )
                        }

                        {/* <li>

                            <NavLink to="/cart">
                                <StyledBadge badgeContent={cart?.length} color="secondary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </NavLink>
                        </li> */}
                    </ul>
                </div>
            </section>
        </>
    )
}

export default Header