import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Spinner = ({path = "login"}) => {

    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate(`/${path}`)
        return () => clearInterval(interval)
    }, [count, navigate, path])
    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Horizontally center
                    alignItems: 'center',     // Vertically center
                    minHeight: '100vh',       // Set minimum height of the container to the viewport height
                }}
            >
                <h1>Redirecting in {count} second</h1>
                <CircularProgress />
            </Box>
        </>

    );
}

export default Spinner;
