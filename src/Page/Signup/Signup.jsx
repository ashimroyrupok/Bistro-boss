import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../Provider/AuthProvider";
import { Link } from "react-router-dom";

const Signup = () => {
    const {createUser} = useContext(AuthContext)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()


    const onSubmit = data => {
        console.log(data);
        createUser(data.email,data.password)
        .then(res => {
            console.log(res.user);
        })
        .catch(err => {
            console.log(err.message);
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign UP!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" {...register("name", { required: true })} type="text" placeholder="name" className="input input-bordered" />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" {...register("email", { required: true })} type="email" placeholder="email" className="input input-bordered" />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password"  {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 12,
                                pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}/
                            })} type="password" placeholder="password" className="input input-bordered" />
                            {errors.password?.type === "required" && (
                                <p className="text-red-600">password is required</p>
                            )}
                            {errors.password?.type === 'minLength' && <span className="text-red-600">Password must be 6 character</span>}
                            {errors.password?.type === 'pattern' && <span className="text-red-600">Password must be 1 character</span>}
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">Signup</button>
                        </div>
                    </form>
                    <p className="pb-6 text-orange-600 text-center"> <Link to='/login'>Login</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;