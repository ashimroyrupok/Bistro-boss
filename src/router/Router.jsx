import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../Page/Home/Home";
import OurPage from "../Page/OurPage/OurPage";
import Order from "../Page/Order/Order/Order";

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
          path:"/order",
          element: <Order></Order>
        }
      ]
      
    },
  ]);



  export default router