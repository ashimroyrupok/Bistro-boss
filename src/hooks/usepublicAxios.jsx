import axios from "axios";

    const axiosPublic = axios.create({
        baseURL:'http://localhost:5000'
    })

const usepublicAxios = () => {
    return axiosPublic
  
};


export default usepublicAxios;