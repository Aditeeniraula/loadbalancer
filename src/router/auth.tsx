import React from 'react'
import { Navigate, RouteObject } from "react-router";
import AuthLayout from "../components/layout/auth";
import Settings from "../pages/settings";
import Servers from "../pages/servers";
import ReplicaDetails from "../pages/replicas";
import Dashboard from '../pages/dashboard';

export const AuthRoutes: RouteObject = {
    path: '/',
    element: <AuthLayout />,
    children: [
        {
            index: true,
            element: <Navigate to='/dashboard' replace />,
        },
        {
            path: '/dashboard',
            element: <Dashboard />,
        },
        {
            path: '/settings',
            element: <Settings />,
        },
        {
            path: '/servers',
            element: <Servers />
        },
        {
            path: '/replicas',
            element: <ReplicaDetails />
        },
    ],
}
