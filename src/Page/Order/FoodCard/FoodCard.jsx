import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const FoodCard = ({ item }) => {
    const { user } = useAuth()
    const { name, recipe, image, category, price,_id } = item
    const navigate = useNavigate()
    const location = useLocation()
    const axiosSecure = useAxiosSecure()
    const [,refetch] = useCart()
    const handleCart = (item) => {
        // console.log(item);
        if (user && user?.email) {
            // console.log(item, user?.email);
            const cartItem ={
                menuId : _id,
                email: user?.email,
                name,
                image,
                price
            }

            axiosSecure.post("/carts" ,cartItem)
            .then(res => {
                console.log(res?.data);
                if(res.data?.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: ` ${name} added successful `,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch();
                }
            })
        }
        else {
            Swal.fire({
                title: "Please login?",
                text: "You are'nt login !",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, login!"
            }).then((result) => {
                if (result.isConfirmed) {

                    navigate('/login' , {state:{from:location}} )
                    // Swal.fire({
                    //     title: "Deleted!",
                    //     text: "Add to Cart.",
                    //     icon: "success"
                    // });
                    
                }
            });
        }
    };

    return (
        <div className="card card-compact w-96 bg-base-100 shadow-xl bg-slate-50">
            <figure><img src={image} alt="Shoes" /></figure>
            <div className="card-body flex flex-col items-center justify-center">
                <h2 className="card-title"> {name} </h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions ">
                    <button onClick={ ()=> handleCart(item)} className="btn btn-outline border-b-4">Add to Card</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;