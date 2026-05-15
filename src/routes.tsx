import { createBrowserRouter } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import HomeLayout from "@/layout/HomeLayout"
import MyPage from "./components/MyPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/home",
        element: <HomeLayout />
    },
    {
        path: "/my-page",
        element: <MyPage />
    }
])

export default router