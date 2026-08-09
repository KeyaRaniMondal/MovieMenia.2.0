import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from 'react-router-dom';
import { TMDB_OPTIONS, movieImageUrl } from '../lib/tmdb';

const CardList = ({ title = "Top Rated", category = "" }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, TMDB_OPTIONS)
            .then(res => res.json())
            .then(res => setData(res.results || []))
            .catch(err => console.error(err));
    }, [category]);

    return (
        <div className="text-white md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

            <Swiper slidesPerView={"auto"} spaceBetween={10} className="mySwiper">
                {
                    data.map((item) => (
                        <SwiperSlide key={item.id} className="max-w-72">
                            <Link to={`/movie/${item.id}`}>
                                {item.backdrop_path ? (
                                    <img src={movieImageUrl(item.backdrop_path, "w500")} alt={item.title} />
                                ) : (
                                    <div className="w-72 h-40 bg-gray-700 flex items-center justify-center text-xs text-gray-400">No Image</div>
                                )}
                                <h3>{item.title || item.original_title}</h3>
                                <p>{item.overview?.slice(0, 80) || "No description available."}</p>

                            </Link>
                        </SwiperSlide >
                    ))
                }
            </Swiper>
        </div>
    )
}
export default CardList;
