import React from 'react'
import { Outlet } from 'react-router'

const GuestLayout = () => {
    return (
        <main>
            {/* <Sidebar /> */}
            <Outlet />
        </main>
    )
}

export default GuestLayout
