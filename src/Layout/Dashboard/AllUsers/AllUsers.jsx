import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaTrash, FaUsers } from 'react-icons/fa6';
import Swal from 'sweetalert2';

const AllUsers = () => {

    const axiosSecure = useAxiosSecure()

    const { data: users = [], refetch } = useQuery({
        queryKey: "/users",
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })

    const handleDelete = id => {

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

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
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
    const handleMakeAdmin =user => {
        // console.log(user);
        axiosSecure.patch(`/users/admin/${user?._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){

                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user?.name} make admin`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        })

    }

    return (
        <div>
            <div className='flex justify-evenly my-4 text-black'>
                <h2 className='text-3xl'> All Users</h2>
                <h2 className='text-3xl'> Total Users {users.length} </h2>
            </div>

            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            users?.map((user, idx) => <tr key={user?._id}>
                                <th> {idx + 1} </th>
                                <td> {user?.name} </td>
                                <td> {user?.email} </td>
                                <td>

                                  { user.role? "admin" :  <button onClick={()=> handleMakeAdmin(user)} className='bg-orange-400 btn btn-ghost'>
                                        <FaUsers className='text-white text-2xl'></FaUsers>
                                    </button>}

                                </td>
                                <td>
                                    <button onClick={() => handleDelete(user?._id)} className="btn btn-ghost bg-red-600 btn-xs"> <FaTrash className="text-lg text-white"></FaTrash> </button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default AllUsers;