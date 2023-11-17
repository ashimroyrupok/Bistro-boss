import {
    createBrowserRouter,
  } from "react-router-dom";
import Home from "../Page/Home/Home";
import OurPage from "../Page/OurPage/OurPage";
import Order from "../Page/Order/Order/Order";
import Login from "../Page/Login/Login";
import MainLayout from "../Layout/MainLayout";
import Signup from "../Page/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Secret from "../Shared/Secret/Secret";
import Dashboard from "../Layout/Dashboard/Dashboard";
import Cart from "../Layout/Dashboard/Cart/Cart";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children:[
        {
          path:"/",
          element: <Home></Home>
        }
        ,
        {
          path:"/ourPage",
          element: <OurPage></OurPage>
        },
        {
          path:"/order/:category",
          element: <Order></Order>
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/signup",
          element: <Signup></Signup>
        },
        {
          path: "/secret",
          element: <PrivateRoute> <Secret></Secret> </PrivateRoute>
        }
      ]     
    },

    {
      path:"/dashboard",
      element: <Dashboard></Dashboard>, 
      children:[
        {
          path:"mycart",
          element: <Cart></Cart>
        }
      ]
    }
  ]);



  export default router