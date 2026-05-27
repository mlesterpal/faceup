import { createBrowserRouter, Navigate } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import HomeLayout from "@/layout/HomeLayout"
import ProfilePage from "@/pages/ProfilePage"
import FriendsPage from "@/pages/FriendsPage"
import { CURRENT_USER_ID } from "@/constants/currentUser"
import FriendRequestsView from "@/components/friends/FriendRequestsView"
import FriendSuggestionsView from "@/components/friends/FriendSuggestionsView"
import AllFriendsView from "@/components/friends/AllFriendsView"
import OutgoingRequestsView from "@/components/friends/OutgoingRequestsView"
import FriendsViewPlaceholder from "@/components/friends/FriendsViewPlaceholder"

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
        path: "/profile",
        element: <Navigate to={`/profile/${CURRENT_USER_ID}`} replace />,
    },
    {
        path: "/profile/:userId",
        element: <ProfilePage />,
    },
    {
        path: "/my-page",
        element: <Navigate to={`/profile/${CURRENT_USER_ID}`} replace />,
    },
    {
        path: "/friends",
        element: <FriendsPage />,
        children: [
            {
                index: true,
                element: <FriendRequestsView preview />,
            },
            {
                path: "requests",
                element: <FriendRequestsView />,
            },
            {
                path: "outgoing",
                element: <OutgoingRequestsView />,
            },
            {
                path: "suggestions",
                element: <FriendSuggestionsView />,
            },
            {
                path: "all",
                element: <AllFriendsView />,
            },
            {
                path: "birthdays",
                element: (
                    <FriendsViewPlaceholder message="Birthdays View - Calendar/Upcoming Placeholder" />
                ),
            },
            {
                path: "lists",
                element: (
                    <FriendsViewPlaceholder message="Custom Lists View Placeholder" />
                ),
            },
        ],
    },
])

export default router
