import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: payments = [] } = useQuery({
        queryKey: ["payments", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`payments/${user?.email}`)
            return res.data
        }
    })

    return (
        <div>

            <h2>Total Payment {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            payments.map((item,idx) => <tr key={item._id}>
                                <th>  {idx+1} </th>
                                <th>  {item?.date} </th>
                                <td> {item?.price} </td>
                                <td> {item?.transectionId} </td>
                                <td> {item?.status} </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;