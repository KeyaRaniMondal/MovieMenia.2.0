import React, { useEffect, useState } from 'react';
import logo from "../assets/logo.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';

const CardList = ({ title = "Top Rated", category = "" }) => {
    const [data, setData] = useState([]);
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZTQ0NGFhNGJjZjI4ZjVlZTA2MTM0M2E3ZTVkNzM3OSIsIm5iZiI6MTc2OTQ2MDQxMy42OTkwMDAxLCJzdWIiOiI2OTc3ZDJiZGY5NzZlNDNmYmRhYmEzNWYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.cIpj8Qk8IIIxaEuFePPykJ1507B4CbeAzzMQUOJakbM'
        }
    };

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
            .then(res => res.json())
            .then(res => setData(res.results))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="text-white md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

            <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
                {
                    data.map((item) => (
                        <SwiperSlide key={item.id} className="max-w-72">
                            <Link to={`/movie/${item.id}`}>
                                <img src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`} alt={item.title} />
                                <h3>{item.original_title}</h3>
                                <p>{item.description}</p>

                            </Link>
                        </SwiperSlide >
                    ))
                }
            </Swiper>
        </div>
    )
}
export default CardList;
