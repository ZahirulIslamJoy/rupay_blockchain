import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import Home from "../layout/homepage/Home";
import Login from "../layout/login/Login";
import Register from "../layout/registration/Register";
import Dashboard from "../layout/dashboard/Dashboard";
import SendMoney from "../layout/dashboard/SendMoney";

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
        },
        {
          path:"/register",
          element:<Register></Register>
      },
      {
        path: "/dashboard",
        element:<Dashboard></Dashboard>,
        children:[
          {
            path:"profile",
            element:<p>hi</p>
          },
          {
            path:"sendmoney",
            element:<SendMoney></SendMoney>
          },
        ]
      }
    ]
  },
]);


export default router;