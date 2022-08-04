import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export const Layout = ({ children }) => {
    return (
        <>
            <div className='wrapper'>
                <Header />
                <Sidebar />
                {children}
            </div>
        </>
    )
}
