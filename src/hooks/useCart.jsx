import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const useCart = () => {
    // tan stack query
    const axiosSecure = useAxiosSecure();
    const {user} = useContext(AuthContext)
    const { refetch,data: cart = [] } = useQuery({
        queryKey: ["cart" ,user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/carts?email=${user?.email}`)
            // console.log(res.data);
            const result = res.data
            // console.log(result);
            return result ;

        }
    })

    return [cart,refetch]

};


export default useCart;