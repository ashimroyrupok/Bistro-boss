import { Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";

const MainLayout = () => {
    const location = useLocation()
    console.log(location);
    const isLogin = location.pathname.includes('login') || location.pathname.includes('signup')
    return (
        <div className="bg-white">
            {isLogin || <Navbar></Navbar>}
            <Outlet></Outlet>
            {isLogin || <Footer></Footer>}
            
        </div>
    );
};

export default MainLayout;