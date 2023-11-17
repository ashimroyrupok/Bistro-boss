import { NavLink, Outlet } from "react-router-dom";
import { FaBookmark, FaCalendar, FaCartArrowDown, FaCheck, FaHouse, FaList, FaShopLock } from "react-icons/fa6";
import Cart from "./Cart/Cart";

const Dashboard = () => {
    return (
        <div className="flex">
            {/* side bar */}
            <div className="bg-orange-400 w-64 min-h-screen text-black font-semibold">

                <ul className="menu p-4">
                    <li className=" ">
                         <NavLink to='/dashboard/home'> <FaHouse></FaHouse> 
                         <span>Admin Home</span>
                          </NavLink>
                          </li>
                    <li>
                         <NavLink to='/dashboard/reservation'>
                             <FaCalendar></FaCalendar> 
                             reservation</NavLink> 
                             </li>
                    <li> 
                        <NavLink to='/dashboard/manageItem'> 
                         manage items
                         </NavLink> 
                         </li>
                    <li> 
                        <NavLink to='/dashboard/mycart'>
                             <FaCartArrowDown></FaCartArrowDown>
                              My Cart </NavLink>
                               </li>
                    <li> <NavLink to='/dashboard/review'> <FaCheck></FaCheck>  add review</NavLink> </li>
                    <li> <NavLink to='/dashboard/mybooking'>  <FaBookmark></FaBookmark> my booking</NavLink> </li>

                    <div className=" flex flex-col w-full"> <div className="divider divider-error"></div> </div>

                    <li className=" "> <NavLink to='/'> <FaHouse></FaHouse> <span> Home</span> </NavLink> </li>
                    <li className=" "> <NavLink to='/order/salad'> <FaList></FaList> <span>Menu</span> </NavLink> </li>
                    <li className=" "> <NavLink to='/'> <FaShopLock></FaShopLock> <span> Shop</span> </NavLink> </li>



                </ul>

            </div>

            {/* dashboard content */}

            <div className="ml-10 flex-1 p-8">

                <Outlet></Outlet>

            </div>

        </div>
    );
};

export default Dashboard;