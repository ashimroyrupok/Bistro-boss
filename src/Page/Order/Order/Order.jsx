import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import 'react-tabs/style/react-tabs.css';
import Cover from "../../../Shared/Cover";
import img from "../../../assets/shop/banner2.jpg"
import { useState } from "react";
import useMenu from "../../../hooks/useMenu";
import OrderTab from "../OrderTab/OrderTab";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";

const Order = () => {
    const categories = ['salad', "pizza", "soup", "dessert", "drinks"]
    const { category } = useParams()
    const lowerCase = category.toLowerCase()
    console.log(lowerCase);
    const initialIndex = categories.indexOf(lowerCase)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    // console.log(category);
    console.log(tabIndex);
    const [menu] = useMenu()
    console.log(menu);
    // const offered = menu?.filter(item => item.category === "offered") 
    const pizzas = menu?.filter(item => item.category === "pizza")
    const desserts = menu?.filter(item => item.category === "dessert")
    const salads = menu?.filter(item => item.category === "salad")
    const soups = menu?.filter(item => item.category === "soup")
    const drinks = menu?.filter(item => item.category === "drinks")

    return (
        <div className="">
            <Helmet>
                <meta charSet="utf-8" />
                <title>Bistro | Order Food</title>
                <link rel="canonical" href="http://mysite.com/example" />
            </Helmet>
            <Cover title={"Order Food"} img={img}></Cover>
            <Tabs className="my-10" defaultIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
                <TabList>
                    <Tab>SALAD</Tab>
                    <Tab>PIZZA</Tab>
                    <Tab>SOUP</Tab>
                    <Tab>DESSERT</Tab>
                    <Tab>DRINKS</Tab>
                </TabList>

                <TabPanel>
                    <OrderTab items={salads}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={pizzas}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={soups}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={desserts}></OrderTab>
                </TabPanel>

                <TabPanel>
                    <OrderTab items={drinks}></OrderTab>
                </TabPanel>
            </Tabs>

        </div>
    );
};

export default Order;