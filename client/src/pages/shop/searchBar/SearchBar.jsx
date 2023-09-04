import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import axios from 'axios';


const customStyles = {
    width: 400, // Set the width as per your requirement
};

// Define a function to render the input field
const renderInput = (params) => (
    <TextField
        {...params}
        label="Search Game"
        variant="outlined" // You can choose the variant you prefer
        InputProps={{
            ...params.InputProps,
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon color="action" /> {/* Add a search icon */}
                </InputAdornment>
            ),
        }}
    />
);

const SearchBar = () => {
    const [products, setProducts] = useState([]);

    const getAllProduct = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-allProduct`)
            if (data.success) {
                setProducts(data.products);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAllProduct();
    }, [])

    // Event handler for when a product is selected
    const handleProductSelect = (event, productDetails) => {
        if (productDetails) {
            console.log(productDetails)
        }
    };

    return (
        <>
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={products}
                getOptionLabel={(product) => product.name}
                sx={customStyles}
                renderInput={renderInput} // Use the custom renderInput function
                onChange={handleProductSelect}
            />
        </>
    )
}

export default SearchBar