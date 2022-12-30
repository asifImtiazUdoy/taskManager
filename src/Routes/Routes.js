import { createBrowserRouter } from "react-router-dom";
import AddTask from "../components/AddTask/AddTask";
import Home from "../components/Home/Home";
import Main from "../components/layouts/Main";
import Login from "../components/Login/Login";
import MyTasks from "../components/MyTask/MyTasks";
import Register from "../components/Register/Register";
import PrivateRoutes from "./PrivateRoutes";

export const route = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/task/create',
                element: <PrivateRoutes><AddTask></AddTask></PrivateRoutes>
            },
            {
                path: '/tasks',
                element: <PrivateRoutes><MyTasks></MyTasks></PrivateRoutes>
            },
            {
                path: '/tasks/completed',
                element: <PrivateRoutes><MyTasks></MyTasks></PrivateRoutes>
            },
            {
                path: '/tasks/incompleted',
                element: <PrivateRoutes><MyTasks></MyTasks></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
        ]
    },
    {
        path: '/*',
        element: 'This page is not exists'
    }
])