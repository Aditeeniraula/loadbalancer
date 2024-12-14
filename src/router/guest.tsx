import { Navigate, RouteObject } from "react-router";
import GuestLayout from "../components/layout/guest";
import Home from "../pages/home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgot-password";
import ResetPassword from "../pages/auth/reset-password";
import EnterOTP from "../pages/auth/enter-otp";

export const GuestRoutes: RouteObject = {
    path: '/',
    element: <GuestLayout />,
    children: [
        {
            index: true,
            element: <Navigate to='/home' replace />,
        },
        {
            path: '/home',
            element: <Home />,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/register',
            element: <Register />
        },
        {
            path: '/forgot-password',
            element: <ForgotPassword />
        },
        {
            path: '/reset-password',
            element: <ResetPassword />
        },
        {
            path: '/enter-otp',
            element: <EnterOTP />
        },
        // {
        //     path: '/*',
        //     element: <Navigate to='/' replace={true} />,
        // },
    ],
}
