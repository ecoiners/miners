import { createBrowserRouter } from "react-router-dom";
import MainLayouts from "./components/Layouts/MainLayouts";
import ErrorElement from "./components/ui/ErrorElement";
import AdminLayout from "./components/Layouts/AdminLayout";
import Login from "./pages/Admin/Login";
import AdminProtector from "./utils/AdminProtector";
import UserManagement from "./pages/Admin/UserManagement";
import TaskManagement from "./pages/Admin/TaskManagement";
import DistributionManagement from "./pages/Admin/DistributionManagement";
import Refer from "./pages/Refer";
import Game from "./pages/Game";
import Home from "./pages/Home";
import LeaderboardPage from "./pages/Leaderboard";
import Airdrop from "./pages/Airdrop";
import Splash from "./pages/Splash";
import RouteProtector from "./utils/RouteProtector";
import Link from "./pages/Link";

const MainRoutes = createBrowserRouter([
    {
        path: '/',
        element: <RouteProtector><MainLayouts /></RouteProtector>,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'leaderboard',
                element: <LeaderboardPage />
            },
            {
                path: 'refer',
                element: <Refer />
            },
            {
                path: 'airdrop',
                element: <Airdrop />
            },

        ]
    },
    {
        path: '/admin/login',
        element: <Login />,
        errorElement: <ErrorElement />,
    },
    {
        path: 'splash',
        element: <Splash />
    },
    {
        path: '/admin',
        element: <AdminProtector><AdminLayout /></AdminProtector>,
        errorElement: <ErrorElement />,
        children: [
            {
                index: true,
                element: <UserManagement />
            },
            {
                path: 'task',
                element: <TaskManagement />
            },
            {
                path: 'distribution',
                element: <DistributionManagement />
            }
        ]
    }
]);

export default MainRoutes;