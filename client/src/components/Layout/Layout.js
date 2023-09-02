import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Toaster} from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';

const Layout = (props) => {
    return (
        <>
            <Header />
            <main>
                <Toaster position='top-right'/>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Layout