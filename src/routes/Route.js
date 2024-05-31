import { createBrowserRouter } from "react-router-dom";
import Main from "../main/Main";
import Home from "../layout/homepage/Home";
import Login from "../layout/login/Login";
import Register from "../layout/registration/Register";

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
      }
    ]
  },
]);


export default router;