import React, { useEffect } from 'react'
import { useState } from 'react';
import PageHeader from '../../components/page-header/PageHeader'
// import Shopcard from '../../components/shopcard/Shopcard'
import ProductsCard from '../../components/small_components/ProductsCard';
import './shop.css';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';

const Shop = () => {
    const [products, setProducts] = useState([]);

    const getAllProducts = async() => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-allProduct`);
            // console.log(data)
            setProducts(data.products)
        } catch (error) {
            console.log(error);
            
        }
    }
    useEffect(() => {
        getAllProducts();
    },[]);
    // getAllProducts();
    return (
        <>
            <Layout>
                <div>
                    <PageHeader />
                    <div className='shopcard'>
                    {
                       products?.map((p) => (
                        <ProductsCard
                            key={p._id}
                            product = {p}
                            picturePath={`${process.env.REACT_APP_API}/api/v1/product/get-productPhoto/${p._id}`}
                            productName={p.name}
                            productPrice={p.price}
                        />
                       )) 
                    }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Shop