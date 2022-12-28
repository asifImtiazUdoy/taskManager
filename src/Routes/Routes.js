import { createBrowserRouter } from "react-router-dom";
import Main from "../components/layouts/Main";

export const route = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            
        ]
    }
])