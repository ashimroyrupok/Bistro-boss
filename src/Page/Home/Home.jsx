import { Helmet } from "react-helmet";
import Banner from "../../components/Banner/Banner";
import Featured from "../../components/Featured/Featured";
import Navbar from "../../components/Navbar/Navbar";
import PopularRecipe from "../../components/PopularRecipe/PopularRecipe";
import Reviews from "../../components/Reviews/Reviews";
import Testimonials from "../../components/Testimonials/Testimonials";
import Category from "../../components/category/Category";


const Home = () => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Bistro | Home</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Navbar></Navbar>
            <Banner></Banner>
            <Category></Category>
            <PopularRecipe></PopularRecipe>
            <Featured></Featured>
            <Testimonials></Testimonials>
            <Reviews></Reviews>

        </div>
    );
};

export default Home;