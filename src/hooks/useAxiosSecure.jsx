import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:5000"
})
const useAxiosSecure = () => {
    const navigate = useNavigate()
    const { logout } = useAuth()
    // request interceptor to add authorization header can every secure for every call
    axiosSecure.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        // console.log("request stpp by interceptors", token);
        config.headers.authorization = `Bearer ${token}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    })

    // intercept 401 and 404 status
    axiosSecure.interceptors.response.use(function (response) {
        return response
    }, async (error) => {
        const status = error.response.status
        // console.log('status err', status);
        // const token = localStorage.getItem('access-token')

        if (status === 401 || status === 403) {


            await logout()
            //     .then(() => {

                    navigate('/login')

            //     })


        }
        return Promise.reject(error)
    })


    return axiosSecure;
};

export default useAxiosSecure;