import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import MenuItem from "../MenuItem/MenuItem";
import useMenu from "../../hooks/useMenu";

const PopularRecipe = () => {

    const [menu] =useMenu()
    const popular = menu.filter(item => item.category === "popular")
    // const [menu, setMenu] =useState([])
    // useEffect(()=> {
    //     fetch('menu.json')
    //     .then(res => res.json())
    //     .then(data => {
    //         const filter = data.filter(item => item.category === "popular")
    //         setMenu(filter)
    //     })
    // },[])
    return (
        <section>
            <SectionTitle subHeading={"---Check it out---"} heading={"FROM OUR MENU"}></SectionTitle>

            <div className="grid md:grid-cols-2 gap-10">
                {
                    popular?.map(item => <MenuItem key={item.key} item={item}></MenuItem>)
                }
            </div>


            
        </section>

    );
};

export default PopularRecipe;