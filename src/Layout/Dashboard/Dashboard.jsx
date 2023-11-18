import { NavLink, Outlet } from "react-router-dom";
import { FaBook, FaBookmark, FaCalendar, FaCartArrowDown, FaCheck, FaHouse, FaList, FaShopLock, FaSpoon, FaUsers } from "react-icons/fa6";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    // const isAdmin = true
    // console.log(isAdmin);

    return (
        <div className="flex">
            {/* side bar */}
            <div className="bg-orange-400 w-64 min-h-screen text-black font-semibold">

                <ul className="menu p-4">

                    {
                        isAdmin ?
                         <>

                            <li className=" ">
                                <NavLink to='/dashboard/home'> <FaHouse></FaHouse>
                                    <span>Admin Home</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/additems'>
                                    <FaSpoon></FaSpoon>
                                    Add Items</NavLink>
                            </li>

                            <li>
                                <NavLink to='/dashboard/manageItem'>
                                    <FaList></FaList>
                                    Manage Items

                                </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/bookings'>
                                    <FaBook></FaBook>
                                    Manage Bookings </NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allusers'>
                                    <FaUsers></FaUsers>
                                    All Users </NavLink>
                            </li>



                        </>
                            :
                            <>
                                <li className=" ">
                                    <NavLink to='/dashboard/home'> <FaHouse></FaHouse>
                                        <span>User Home</span>
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
                            </>
                    }


                    <div className=" flex flex-col w-full"> <div className="divider divider-error"></div> </div>

                    {/* shared navlink */}

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