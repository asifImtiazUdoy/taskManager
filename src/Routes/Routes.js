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
                path: '/tasks/:email',
                element: <PrivateRoutes><MyTasks></MyTasks></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://task-backend-xi.vercel.app/tasks?email=${params.email}`)
            },
            {
                path: '/tasks/completed/:email',
                element: <PrivateRoutes><MyTasks></MyTasks></PrivateRoutes>,
                loader: ({ params }) => fetch(`https://task-backend-xi.vercel.app/tasks?type=completed&email=${params.email}`)
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