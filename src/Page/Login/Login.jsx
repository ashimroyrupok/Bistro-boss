import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = () => {
    const navigate = useNavigate()
    const {login} =useContext(AuthContext)
   const captchaRef = useRef()
   const [disabled ,setDisabled ] =useState(true)
    useEffect(() => {
        loadCaptchaEnginge(6);
    }, [])

    const handleForm = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        login(email,password)
        .then(res=> {
            console.log(res.user);
            Swal.fire("Login successful!");
            navigate('/')
        })
        .catch(err => {
            console.log(err.message);
        })

    }
    const handleValidation = ()=> {
        const user_captcha_value = captchaRef.current.value

        if (validateCaptcha(user_captcha_value)==true) {
            setDisabled(false)
        }
   
        else {
            alert('Captcha Does Not Match');
            setDisabled(true)
        }

    }
    return (
        <div className="hero min-h-screen bg-white">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-slate-50">
                    <form onSubmit={handleForm} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name="password" type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>

                        <div className="form-control">
                             <LoadCanvasTemplate />
                            <input ref={captchaRef} name="captcha" type="text" placeholder="type the captcha" className="input input-bordered my-2" required />
                            <button onClick={handleValidation} className="btn btn-xs">Validate</button>
                        </div>
                        <div className="form-control mt-6">
                            <button disabled={disabled} className="btn bg-[#D1A054] btn-primary">Login</button>
                        </div>
                    </form>
                    <p className='text-center pb-7'> <small>New in Bistro Boss?</small> <Link className='text-[#D1A054]' to='/signup'>Create an account</Link> </p>
                </div>
            </div>
        </div>
    );
};

export default Login;