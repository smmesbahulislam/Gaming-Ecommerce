import React, { useEffect } from 'react'
import { useState } from 'react';
import PageHeader from '../../components/page-header/PageHeader'
// import Shopcard from '../../components/shopcard/Shopcard'
import ProductsCard from '../../components/small_components/ProductsCard';
import './shop.css';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Grid,
    Box,
    Slider
} from '@mui/material';
import CategoriesCheckbox from './categoryCheckbox/CategoriesCheckbox';
import PriceSlider from './priceSlider/PriceSlider';


const marks = [
    {
        value: 0,
        label: '$0',
    },
    {
        value: 10,
        label: '$10',
    },
    {
        value: 20,
        label: '$20',
    },
    {
        value: 30,
        label: '$30',
    },
    {
        value: 40,
        label: '$40',
    },
    {
        value: 50,
        label: '$50',
    },
    {
        value: 60,
        label: '$60',
    },
    {
        value: 70,
        label: '$70',
    },
    {
        value: 80,
        label: '$80',
    },
    {
        value: 90,
        label: '$90',
    },
    {
        value: 100,
        label: '$100',
    },
];

function valuetext(value) {
    return `$${value}`;
}

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([0,1000])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-allProduct`);
            // console.log(data)
            setProducts(data.products)
        } catch (error) {
            console.log(error);

        }
    }

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data.success) {
                setCategories(data.category);
            }
        } catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        getAllProducts();
        getAllCategory();
    }, []);
    // getAllProducts();

    const handleChangeChecked = (value, id) => {
        let selectedCategory = [...checked];
        if (value) {
            selectedCategory.push(id);
        } else {
            selectedCategory = selectedCategory.filter(c => c !== id);
        }
        setChecked(selectedCategory);
    }

    const handleChangedPrice = (event, value) => setSelectedPrice(value) 
    return (
        <>
            <Layout>
                <div>
                    <PageHeader />
                    <Grid container spacing={4}>
                        <Grid item xs={2.5}>
                            <div className="filter_section">
                                {/* category section  */}
                                <div className="category_section">
                                    <p className="label">Categories</p>
                                    {
                                        categories?.map((category) => (
                                            <CategoriesCheckbox
                                                key={category._id}
                                                label={category.name}
                                                category={category}
                                                changeChecked={handleChangeChecked}
                                            />
                                        ))
                                    }
                                </div>

                                {/* price range  */}
                                <div className="price_section">
                                    <p className='label'>Price</p>
                                    <PriceSlider value={selectedPrice} changedPrice={handleChangedPrice}/>
                                    
                                    {/* {
                                        JSON.stringify(selectedPrice, null, 4)
                                    } */}
                                </div>

                                
                                {/* start rating  */}

                            </div>
                        </Grid>

                        <Grid item xs={9.5}>
                            <div className='shopcard'>
                                {
                                    products?.map((p) => (
                                        <ProductsCard
                                            key={p._id}
                                            product={p}
                                            picturePath={`${process.env.REACT_APP_API}/api/v1/product/get-productPhoto/${p._id}`}
                                            productName={p.name}
                                            productPrice={p.price}
                                        />
                                    ))
                                }
                            </div>
                        </Grid>

                    </Grid>

                </div>
            </Layout>
        </>
    )
}

export default Shop