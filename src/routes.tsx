import { createBrowserRouter } from "react-router-dom"
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"
import HomeLayout from "@/layout/HomeLayout"
import MyPage from "@/components/MyPage"
import FriendsPage from "@/pages/FriendsPage"
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
        path: "/my-page",
        element: <MyPage />
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
