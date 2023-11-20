import { FaRegCreditCard, FaTrash } from "react-icons/fa6";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import { RiImageEditFill } from "react-icons/ri";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const ManageItems = () => {
    // const [menu, loading] = useMenu()
    const [menu, , refetch] = useMenu()
    const axiosSecure = useAxiosSecure()



    const handleDelete = item => {
        // console.log(item);
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                // 
                const res = await axiosSecure.delete(`/menu/${item._id}`)
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }

            }
        });
    }
    return (
        <div>
            <SectionTitle subHeading="---Hurry Up!---" heading="MANAGE ALL ITEMS"></SectionTitle>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th> #  </th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            menu?.map((item, idx) => <tr key={item?._id}>
                                <td>
                                    {idx + 1}
                                </td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>{item?.name}   </td>
                                <td> {item?.price} $ </td>
                                <td>
                                    <Link to={`/dashboard/updateitem/${item?._id}`} >
                                        <button

                                            className="btn btn-ghost bg-red-600 btn-xs">
                                            <RiImageEditFill className="text-lg text-white"></RiImageEditFill>
                                        </button>
                                    </Link>
                                </td>
                                <td>
                                    <button onClick={() => handleDelete(item)} className="btn btn-ghost bg-red-600 btn-xs"> <FaTrash className="text-lg text-white"></FaTrash> </button>
                                </td>
                            </tr>)
                        }

                    </tbody>


                </table>
            </div>

        </div>
    );
};

export default ManageItems;