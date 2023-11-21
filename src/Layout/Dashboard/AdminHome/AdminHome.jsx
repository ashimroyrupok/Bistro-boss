import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers } from "react-icons/fa6";

const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: stats } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })
    return (
        <div>


            <h1 className="text-3xl">Hello Welcome Back {user?.displayName} </h1>

            <div className="stats shadow">

                <div className="stat place-items-center">
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value"> {stats?.revenue} $ </div>
                    <div className="stat-desc">From January 1st to February 1st</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Users</div>
                    <div className="stat-value text-secondary flex gap-1"> {stats?.users}  <FaUsers></FaUsers> </div>
                    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Menu Item</div>
                    <div className="stat-value"> {stats?.menuItem} </div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
                <div className="stat place-items-center">
                    <div className="stat-title">Order Item</div>
                    <div className="stat-value"> {stats?.orders} </div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>


        </div>
    );
};

export default AdminHome;