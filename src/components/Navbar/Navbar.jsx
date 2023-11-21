import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import useCart from "../../hooks/useCart";
import useAdmin from "../../hooks/useAdmin";
// import { FaBeer } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext)
    const [admin] = useAdmin()

    const [cart] = useCart()
    console.log(cart);



    const handlelogout = () => {
        logout()
            .then(() => {

            })
            .catch(err => {
                console.log(err);
            })
    }
    console.log(user);
    console.log(user?.displayName);

    const nav = <>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/ourPage'>Our Page</Link></li>
        <li><Link to='/order/salad'>Order Food</Link></li>
        <li><Link to='/secret'>Secret</Link></li>

        {
            user && admin && <li><Link to='/dashboard/adminHome'>Admin Home</Link></li>

        
        }
        {
             user && !admin && <li><Link to='/dashboard/userHome'>User Home</Link></li>
        }

        <li>
            <Link to='/dashboard/mycart'>
                <button className="">
                    Shopping Cart
                    <div className="badge badge-secondary ml-1"> {cart.length}  </div>
                </button>
            </Link>
        </li>

        {
            user ? <> <button onClick={handlelogout} className="btn btn-outline">LogOut</button> </> : <> <li><Link to='/login'>Login</Link></li> </>
        }



    </>


    return (
        <div className="navbar fixed  z-10  font-semibold bg-black bg-opacity-30 max-w-screen-xl mx-auto text-white">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {nav}
                    </ul>
                </div>
                <a className="btn btn-ghost normal-case text-xl">BISTRO BOSS</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {nav}
                </ul>
            </div>
            <div className="navbar-end">
                <p> {user?.displayName} </p>
                <div className="w-10 rounded-full">
                    <img src={user?.photoURL} alt="" />

                </div>
            </div>
        </div>
    );
};

export default Navbar;