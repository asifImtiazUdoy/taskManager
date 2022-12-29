import { createBrowserRouter } from "react-router-dom";
import AddTask from "../components/AddTask/AddTask";
import Main from "../components/layouts/Main";
import MyTasks from "../components/MyTask/MyTasks";

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
                element: <MyTasks></MyTasks>,
                loader: () => fetch('http://localhost:5000/tasks')
            }
        ]
    }
])