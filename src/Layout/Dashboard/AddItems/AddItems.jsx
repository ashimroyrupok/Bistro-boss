import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa6";
import usepublicAxios from "../../../hooks/usepublicAxios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
console.log(image_hosting_key);
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`

const AddItems = () => {

    const axiosPublic = usepublicAxios()
    const axiosSecure = useAxiosSecure()
    const { register, handleSubmit,reset } = useForm()
    const onSubmit = async (data) => {
        console.log(data.image)
        const imageFile = { image: data.image[0] }
        console.log(imageFile);
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': "multipart/form-data"
            }
        })

        if (res.data.success) {
            const menuInfo = {
                name: data.name,
                recipe: data.recipe,
                image: res.data.data.display_url,
                category: data.category,
                price: parseFloat(data.price)
            }

            const resMenu = await axiosSecure.post('/menu', menuInfo)
            if (resMenu.data.insertedId) {
                // 
                // console.log(resMenu.data);
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product added successful",
                    showConfirmButton: false,
                    timer: 1500
                });
                reset()
            }

            // console.log(menuInfo);

        }

        // console.log(res.data.data?.display_url);
    }


    return (
        <div>
            <div className="mb-9">
                <SectionTitle subHeading="---What's new?---" heading="ADD AN ITEM"></SectionTitle>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <input {...register("name")} /> */}

                <div className="form-control w-full my-2">
                    <label className="label">
                        <span className="label-text"> Recipe name* </span>
                    </label>
                    <input {...register('name')} type="text" placeholder="recipe name" className="input input-bordered w-full " />


                    <div className="flex gap-6">

                        <div className="w-full">
                            <label className="label">
                                <span className="label-text"> Recipe name* </span>
                            </label>
                            <select {...register('category')} className="select select-bordered w-full">
                                <option disabled selected>Select Category</option>
                                <option value="salad">Salad</option>
                                <option value='pizza'>Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value='drinks'>Drinks</option>
                            </select>
                        </div>
                        <div className="w-full">

                            <label className="label">
                                <span className="label-text"> Price </span>
                            </label>
                            <input {...register('price')} type="number" placeholder="price" className="input input-bordered w-full " />
                        </div>
                    </div>

                    <div className="w-[75%]">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Recipe Description</span>
                            </label>
                            <textarea {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                        </div>
                    </div>
                    <input {...register('image')} type="file" className="file-input w-full my-4 max-w-xs" />

                </div>

                <button type="submit" className="btn text-white bg-orange-600">Submit Item <FaUtensils></FaUtensils> </button>

                {/* <input type="submit" /> */}
            </form>

        </div>
    );
};

export default AddItems;