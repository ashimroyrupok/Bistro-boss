import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import { removeItem } from "localforage";

const Reviews = () => {
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/review')
            .then(res => res.json())
            .then(data => {
                setReviews(data)
            })
    }, [])
    return (
        <section className="my-11" >

            <SectionTitle subHeading={"---What Our Clients Say---"} heading={"TESTIMONIALS"}></SectionTitle>
            <div>
                <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                    {
                        reviews.map(review => <SwiperSlide key={review._id}>
                            <div className="flex flex-col items-center justify-center px-10 text-center my-10">

                                <p>  {review.details} </p>
                                <h2 className="text-2xl text-orange-500"> {review.name} </h2>

                            </div>
                        </SwiperSlide>)
                    }
                </Swiper>
            </div>

        </section>
    );
};


export default Reviews;