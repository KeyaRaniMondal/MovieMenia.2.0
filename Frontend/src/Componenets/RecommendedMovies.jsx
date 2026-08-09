import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TMDB_OPTIONS, movieImageUrl } from '../lib/tmdb';

const RecommendedMovies = ({ movieTitles }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to fetch a single movie's data from TMDB by its title
    const fetchMovie = async (title) => {
        const encodedTitle = encodeURIComponent(title);
        // The query fetches specific movie data based on the AI-generated title
        const url = `https://api.themoviedb.org/3/search/movie?query=${encodedTitle}`;

        try {
            // 'TMDB_OPTIONS' refers to the TMDB API configuration (Bearer token/headers) 
            const res = await fetch(url, TMDB_OPTIONS);
            const data = await res.json();
            // Return the first/most relevant result or null if none found
            return data.results && data.results.length > 0 ? data.results[0] : null;
        } catch (error) {
            console.log("Error fetching movie details:", error);
            return null;
        }
    };

    useEffect(() => {
        const loadMovies = async () => {
            setLoading(true);

            // Batch fetch all 10 movie details simultaneously using Promise.all 
            const results = await Promise.all(
                movieTitles.map((title) => fetchMovie(title))
            );

            // Filter out results where TMDB could not find a matching movie title 
            setMovies(results.filter((movie) => movie !== null));
            setLoading(false);
        };

        if (movieTitles && movieTitles.length > 0) {
            loadMovies();
        }
    }, [movieTitles]);

    if (loading) {
        return <p className="text-white text-center mt-10">Loading recommended movies...</p>;
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {movies.map((movie) => (
                <Link
                    to={`/movie/${movie.id}`}
                    key={movie.id}
                    className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition duration-300"
                >
                    {/* Display the poster; use a fallback if the poster path is missing*/}
                    {movie.poster_path ? (
                        <img
                            src={movieImageUrl(movie.poster_path, "w500")}
                            alt={movie.title}
                            className="w-full h-48 object-cover"
                        />
                    ) : (
                        <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-white">No Poster</div>
                    )}

                    <div className="p-2"> {/* [13] */}
                        <h3 className="text-sm font-semibold text-white truncate">{movie.title}</h3>
                        <p className="text-xs text-gray-400">
                            {/* Extract only the year from the release date string */}
                            {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RecommendedMovies;
