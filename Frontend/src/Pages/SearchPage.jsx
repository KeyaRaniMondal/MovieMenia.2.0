import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { TMDB_OPTIONS, movieImageUrl } from "../lib/tmdb";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [searchedQuery, setSearchedQuery] = useState(null);

    const hasQuery = query.trim() !== "";
    const loading = searchedQuery !== query;

    useEffect(() => {
        if (!hasQuery) return;

        let cancelled = false;

        fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US&page=1`, TMDB_OPTIONS)
            .then((res) => res.json())
            .then((res) => {
                if (!cancelled) {
                    setMovies(res.results || []);
                    setError(null);
                    setSearchedQuery(query);
                }
            })
            .catch(() => {
                if (!cancelled) {
                    setMovies([]);
                    setError("Something went wrong while searching.");
                    setSearchedQuery(query);
                }
            });

        return () => {
            cancelled = true;
        };
    }, [query, hasQuery]);

    return (
        <div className="min-h-screen bg-[#181818] text-white px-4 md:px-8 py-8">
            <h1 className="text-2xl font-bold mb-6">
                {hasQuery ? `Results for "${query}"` : "Search Movies"}
            </h1>

            {loading && <p className="text-gray-400">Searching...</p>}

            {!loading && error && <p className="text-red-500">{error}</p>}

            {!loading && !error && !hasQuery && (
                <p className="text-gray-400">Type a movie name in the search bar above.</p>
            )}

            {!loading && !error && hasQuery && movies.length === 0 && (
                <p className="text-gray-400">No movies found. Try a different search.</p>
            )}

            {!loading && !error && movies.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {movies.map((movie) => (
                        <Link
                            to={`/movie/${movie.id}`}
                            key={movie.id}
                            className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition duration-300"
                        >
                            {movie.poster_path ? (
                                <img
                                    src={movieImageUrl(movie.poster_path, "w500")}
                                    alt={movie.title}
                                    className="w-full h-64 object-cover"
                                />
                            ) : (
                                <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                                    No Poster
                                </div>
                            )}
                            <div className="p-3">
                                <h3 className="text-sm font-semibold truncate">{movie.title}</h3>
                                <p className="text-xs text-gray-400">
                                    {movie.release_date ? movie.release_date.slice(0, 4) : "N/A"}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchPage;
