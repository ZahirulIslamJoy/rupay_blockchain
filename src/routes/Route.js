import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import Home from "../layout/homepage/Home";
import Login from "../layout/login/Login";
import Register from "../layout/registration/Register";
import Dashboard from "../layout/dashboard/Dashboard";
import SendMoney from "../layout/dashboard/SendMoney";
import Profile from "../layout/dashboard/Profile";
import AddBalanceToAuthority from "../layout/dashboard/AddBalanceToAuthority";

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
            element:<Profile></Profile>
          },
          {
            path:"sendmoney",
            element:<SendMoney></SendMoney>
          },
          {
            path:"addmoney",
            element:<AddBalanceToAuthority></AddBalanceToAuthority>
          },
        ]
      }
    ]
  },
]);


export default router;