import { FaGoogle } from "react-icons/fa6";
import useAuth from "../../hooks/useAuth";
import usepublicAxios from "../../hooks/usepublicAxios";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const { googleSignIN } = useAuth()
    const axiosPublic = usepublicAxios()
    const navigate = useNavigate()

    const handleGoogleSignin = () => {

        googleSignIN()
            .then(res => {
                console.log(res.user);
                const userInfo = {
                    name: res.user?.displayName,    
                    email: res.user?.email,
                    password: "google login"
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data);
                        navigate('/')
                    })
            })
            .catch(err => {
                console.log(err.message);
            })
    }


    return (
        <div className="text-center py-3">
            <button onClick={handleGoogleSignin} className="btn hover:bg-slate-300"> <FaGoogle></FaGoogle>Google </button>

        </div>
    );
};

export default SocialLogin;