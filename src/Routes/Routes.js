import { createBrowserRouter } from "react-router-dom";
import AddTask from "../components/AddTask/AddTask";
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
                path: '/task/create',
                element: <AddTask></AddTask>
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
    }
])