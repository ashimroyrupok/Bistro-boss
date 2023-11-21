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
import AllUsers from "../Layout/Dashboard/AllUsers/AllUsers";
import AddItems from "../Layout/Dashboard/AddItems/AddItems";
import AdminPrivateRoute from "./AdminPrivateRoute";
import ManageItems from "../Layout/Dashboard/ManageItems/ManageItems";
import UpdateItem from "../Layout/Dashboard/UpdateItem/UpdateItem";
import Payment from "../Layout/Dashboard/Payment/Payment";
import PaymentHistory from "../Layout/Dashboard/PaymentHistory/PaymentHistory";
import UserHome from "../Layout/Dashboard/UserHome/UserHome";
import AdminHome from "../Layout/Dashboard/AdminHome/AdminHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>
      }
      ,
      {
        path: "/ourPage",
        element: <OurPage></OurPage>
      },
      {
        path: "/order/:category",
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
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // user routes
      {
        path: "mycart",
        element: <Cart></Cart>
      },
      {
        path: "payment",
        element: <Payment></Payment>
      },
      {
        path:"paymenthistory",
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: "userHome",
        element: <UserHome></UserHome>

      },
      // admin routes

      {
        path: "adminHome",
        element: <AdminPrivateRoute> <AdminHome></AdminHome> </AdminPrivateRoute>
      },
      {
        path: "allusers",
        element: <AdminPrivateRoute> <AllUsers></AllUsers> </AdminPrivateRoute>
      },
      {
        path: "additems",
        element: <AdminPrivateRoute> <AddItems></AddItems> </AdminPrivateRoute>
      },
      {
        path:"updateitem/:id",
        element: <AdminPrivateRoute> <UpdateItem></UpdateItem> </AdminPrivateRoute>,
        loader: ({params})=> fetch(`http://localhost:5000/menu/${params.id}`)

      },
      {
        path: "manageItem",
        element: <ManageItems></ManageItems>
      }
      
    ]
  }
]);



export default router