import { createBrowserRouter } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
])

export default router