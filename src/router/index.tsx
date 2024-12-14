import { createBrowserRouter } from "react-router"
import { AuthRoutes } from "./auth"
import { GuestRoutes } from './guest'


export const router = createBrowserRouter([
    AuthRoutes,
    GuestRoutes
])
