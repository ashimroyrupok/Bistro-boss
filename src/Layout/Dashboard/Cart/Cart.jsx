import { FaTrash } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const Cart = () => {
    const [cart, refetch] = useCart()
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const axiosSecure = useAxiosSecure();
    const handleDelete = id => {
        // console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        console.log(res.data);
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });

                        }
                    })


            }
        });
    }
    return (
        <div>
            <div className="flex bg-[#D1A054] text-black py-2 justify-evenly">
                <h2 className="text-4xl"> Items: {cart.length} </h2>
                <h2 className="text-4xl"> Total Price: {totalPrice} </h2>
                {
                    cart.length ? <Link to={`/dashboard/payment`}> <button className="btn btn-ghost text-white bg-primary">Pay</button> </Link> :
                        <button disabled className="btn btn-primary">Pay</button>
                }
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th> ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}


                        {
                            cart?.map((item, index) => <tr key={item._id}>
                                <th>
                                    <label>
                                        {index + 1}
                                    </label>
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {item?.name}
                                </td>
                                <td> {item?.price} </td>
                                <th>
                                    <button onClick={() => handleDelete(item?._id)} className="btn btn-ghost btn-xs"> <FaTrash className="text-lg text-red-600"></FaTrash> </button>
                                </th>
                            </tr>)
                        }


                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default Cart;