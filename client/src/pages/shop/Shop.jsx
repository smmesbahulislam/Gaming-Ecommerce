import React, { useEffect } from 'react'
import { useState } from 'react';
import PageHeader from '../../components/page-header/PageHeader'
// import Shopcard from '../../components/shopcard/Shopcard'
import ProductsCard from '../../components/small_components/ProductsCard';
import './shop.css';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import {
    Grid,
    Pagination
} from '@mui/material';
import CategoriesCheckbox from './categoryCheckbox/CategoriesCheckbox';
import PriceSlider from './priceSlider/PriceSlider';
import SearchBar from './searchBar/SearchBar';



const Shop = () => {
    const [page, setPage] = useState(1);
    const [products, setProducts] = useState([]);
    // const [totalProduct, setTotalProduct] = useState(0);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [selectedPrice, setSelectedPrice] = useState([0, 1000])
    const [pageCount, setPageCount] = useState(1);

    // const getAllProducts = async (page) => {
    //     try {
    //         const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
    //         // console.log(data)
    //         setProducts(data.products)
    //     } catch (error) {
    //         console.log(error);

    //     }
    // }

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

    const getFilteredProducts = async (checked, selectedPrice, page) => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/get-filteredProducts`, {
                categoryId: checked,
                priceRange: selectedPrice,
                page: page
            })

            if (data.success) {
                setPageCount(data.pageCount)
                setProducts(data.filteredProducts);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error);

        }
    }

    // const totalProductCount = async() => {
    //     try {
    //         const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
    //         if(data.success){
    //             setPageCount(Math.ceil(data.total/6))
    //             // setTotalProduct(data.total);
    //         }else{
    //             console.log(data.message);
    //         }
    //     } catch (error) {
    //         console.log(error); 
    //     }
    // }


    useEffect(() => {
        getAllCategory();
    }, []);

    useEffect(() => {
        getFilteredProducts(checked, selectedPrice, page)
    }, [checked, selectedPrice, page])

    // useEffect(() => {
    //     getAllProducts(page);
    // },[page])



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
                    {/* <div className="shopSearchBar">
                        <SearchBar />
                    </div> */}
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
                                    <PriceSlider value={selectedPrice} changedPrice={handleChangedPrice} />

                                    {/* {
                                        JSON.stringify(selectedPrice, null, 4)
                                    } */}
                                </div>

                                {/* start rating  */}

                            </div>
                        </Grid>

                        <Grid item xs={9.5}>
                            <div className="shopProductTopSection">
                                <label id='heading'>Choose Your Game</label>
                                <SearchBar />
                            </div>
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
                <div className="pagination_section">
                    <Pagination
                        count={pageCount}
                        variant="outlined"
                        color="primary"
                        defaultPage={page}
                        // hideNextButton={true}
                        // hidePrevButton={true}
                        onChange={(event, value) => setPage(value)}
                    />
                </div>
            </Layout>
        </>
    )
}

export default Shop