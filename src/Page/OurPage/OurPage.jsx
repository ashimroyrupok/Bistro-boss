import MenuCategory from "../../Shared/MenuCategory/MenuCategory";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import useMenu from "../../hooks/useMenu";
import Menu from "./Menu/Menu";
import dessert from "../../assets/menu/dessert-bg.jpeg"
import pizza from "../../assets/menu/pizza-bg.jpg"
import salad from "../../assets/menu/salad-bg.jpg"
import soup from "../../assets/menu/soup-bg.jpg"

const OurPage = () => {
    const [menu] = useMenu()
    const offered = menu?.filter(item => item.category === "offered")
    const pizzas = menu?.filter(item => item.category === "pizza")
    const desserts = menu?.filter(item => item.category === "dessert")
    const salads = menu?.filter(item => item.category === "salad")
    const soups = menu?.filter(item => item.category === "soup")
    return (
        <div>

            <Menu></Menu>

            <div>
                {/* offered */}
                <SectionTitle subHeading={"---Don't miss---"} heading={"TODAY'S OFFER"}></SectionTitle>
                <MenuCategory items={offered}></MenuCategory>

                {/* DESSERTS */}
                <MenuCategory 
                items={desserts}
                title={"Dessert"}
                coverImg={dessert}
                ></MenuCategory>

                {/* Pizza */}
                <MenuCategory 
                items={pizzas}
                title={"PIZZA"}
                coverImg={pizza}
                ></MenuCategory>

                {/* salad */}
                <MenuCategory 
                items={salads}
                title={"SALAD"}
                coverImg={salad}
                ></MenuCategory>

                {/* soup */}
                <MenuCategory 
                items={soups}
                title={"SOUP"}
                coverImg={soup}
                ></MenuCategory>

            </div>





        </div>
    );
};

export default OurPage;