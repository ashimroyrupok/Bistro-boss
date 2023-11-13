import img from "../../assets/home/featured.jpg"
import SectionTitle from "../SectionTitle/SectionTitle";
import "./Fearured.css"
const Featured = () => {

    return (
        <section className="featured-img bg-fixed my-10 text-white">
            <SectionTitle subHeading={"---Check it out---"} heading={"FROM OUR MENU"} ></SectionTitle>

            <div className="flex items-center bg-slate-500 bg-opacity-30 justify-center bg-opacity-10 space-x-3 px-36 mb-10 pt-7 pb-16">
                <div>
                    <img className="" src={img} alt="" />

                </div>
                <div>
                    <p>March 20, 2023
                        WHERE CAN I GET SOME?
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptate facere, deserunt dolores maiores quod nobis quas quasi. Eaque repellat recusandae ad laudantium tempore consequatur consequuntur omnis ullam maxime tenetur.</p>
                    <button className="btn btn-outline border-b-4">Read More</button>
                </div>
            </div>

        </section>
    );
};

export default Featured;