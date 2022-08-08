import React from 'react'
import Footer from './Footer'
import Header from './Header'
import Sidebar from './Sidebar'

export const Layout = ({ children }) => {
    return (
        <>
            <div className='wrapper vh-100'>
                <Header />
                <Sidebar />
                {children}
            </div>

            <Footer />
        </>
    )
}
