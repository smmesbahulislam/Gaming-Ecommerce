import React from 'react'
import { NavLink } from 'react-router-dom'
import Layout from '../../components/Layout/Layout'
import './errorPage.css'

const ErrorPage = () => {
    return (
        <Layout>
            <div id='error_page'>
                <div className='error_page_container'>
                    <h2>Opps! Page not found.</h2>
                    <h1>404</h1>
                    <p>We can't find the page you're looking for.</p>
                    <NavLink className="nav_link" to={'/'}>Go back home</NavLink>
                </div>
            </div>
        </Layout>

    )
}

export default ErrorPage