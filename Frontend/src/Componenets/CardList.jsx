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
        <div className="text-[var(--ink)] md:px-4">
            <h2 className="pt-10 pb-5 text-lg font-medium">{title}</h2>

            <Swiper slidesPerView={"auto"} spaceBetween={14} className="mySwiper">
                {data.map((item) => {
                    const movieTitle = item.title || item.original_title || "Untitled";
                    const year = (item.release_date || "").slice(0, 4) || "N/A";

                    return (
                        <SwiperSlide key={item.id} className="!w-[180px] sm:!w-[220px]">
                            <Link
                                to={`/movie/${item.id}`}
                                className="group block overflow-hidden rounded-[24px] border border-white/10 bg-[var(--surface)] shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_50px_rgba(0,0,0,0.45)]"
                            >
                                <div className="relative">
                                    {item.poster_path ? (
                                        <img
                                            src={movieImageUrl(item.poster_path, "w500")}
                                            alt={movieTitle}
                                            className="w-full aspect-[2/3] object-cover transition duration-300 group-hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <div className="w-full aspect-[2/3] bg-gray-700 flex items-center justify-center text-xs text-gray-400">
                                            No Image
                                        </div>
                                    )}

                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white/90">
                                        <span className="text-[10px] font-medium tracking-wide">{year}</span>
                                        <span className="text-[10px] font-semibold">★ {item.vote_average?.toFixed(1) || "N/A"}</span>
                                    </div>
                                </div>

                                <div className="p-3 pb-4">
                                    <h3 className="text-xl font-black tracking-tight leading-snug text-[var(--ink)] mb-3">
                                        {movieTitle}
                                    </h3>
                                </div>
                            </Link>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    )
}
export default CardList;
