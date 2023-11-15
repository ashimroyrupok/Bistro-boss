import { Link } from "react-router-dom";
import MenuItem from "../../components/MenuItem/MenuItem";
import Cover from "../Cover";

const MenuCategory = ({ items, title, coverImg }) => {
    console.log(items);
    return (
        <div className="my-10">

            {title && <Cover title={title} img={coverImg}></Cover>}
            <div className="grid md:grid-cols-2 gap-10">
                {
                    items?.map(item => <MenuItem key={item.key} item={item}></MenuItem>)
                }
            </div>
            <Link to={`/order/${title}`}>
                <button className="btn btn-outline border-b-4 my-6">Order Now</button>
            </Link>

        </div>
    );
};

export default MenuCategory;