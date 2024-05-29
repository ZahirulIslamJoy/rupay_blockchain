import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import Home from "../layout/homepage/Home";
import Login from "../layout/login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element:<Main></Main>,
    children:[
        {
            path:"/",
            element:<Home></Home>
        },
        {
            path:"/login",
            element:<Login></Login>
        }
    ]
  },
]);


export default router;