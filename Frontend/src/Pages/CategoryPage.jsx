import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TMDB_OPTIONS, movieImageUrl } from "../lib/tmdb";

const CATEGORIES = {
  movies: {
    title: "Movies",
    tabs: [
      { label: "Popular", endpoint: "/movie/popular" },
      { label: "Top Rated", endpoint: "/movie/top_rated" },
      { label: "Now Playing", endpoint: "/movie/now_playing" },
      { label: "Upcoming", endpoint: "/movie/upcoming" },
    ],
  },
  "tv-shows": {
    title: "TV Shows",
    tabs: [
      { label: "Popular", endpoint: "/tv/popular" },
      { label: "Top Rated", endpoint: "/tv/top_rated" },
      { label: "Airing Today", endpoint: "/tv/airing_today" },
      { label: "On The Air", endpoint: "/tv/on_the_air" },
    ],
  },
  anime: {
    title: "Anime",
    tabs: [
      { label: "Popular Anime", endpoint: "/discover/tv?with_genres=16&with_original_language=ja&sort_by=popularity.desc" },
      { label: "Top Rated Anime", endpoint: "/discover/tv?with_genres=16&with_original_language=ja&sort_by=vote_average.desc" },
    ],
  },
  "new-popular": {
    title: "New & Popular",
    tabs: [
      { label: "Trending This Week", endpoint: "/trending/all/week" },
      { label: "Trending Today", endpoint: "/trending/all/day" },
      { label: "Now Playing", endpoint: "/movie/now_playing" },
      { label: "Popular", endpoint: "/movie/popular" },
    ],
  },
  upcoming: {
    title: "Upcoming",
    tabs: [
      { label: "Upcoming Movies", endpoint: "/movie/upcoming" },
      { label: "TV Premieres", endpoint: "/tv/on_the_air" },
      { label: "Airing Today", endpoint: "/tv/airing_today" },
    ],
  },
};

const buildUrl = (endpoint) => {
  const base = `https://api.themoviedb.org/3${endpoint}`;
  const separator = endpoint.includes("?") ? "&" : "?";
  return `${base}${separator}language=en-US&page=1`;
};

const linkFor = (item, type) => {
  const isTv = item.media_type === "tv" || type === "tv-shows" || type === "anime";
  return isTv ? `/tv/${item.id}` : `/movie/${item.id}`;
};

const CategoryPage = ({ type }) => {
  const config = CATEGORIES[type];
  const [activeTab, setActiveTab] = useState(0);
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loadedKey, setLoadedKey] = useState("");

  const key = `${type}:${activeTab}`;
  const loading = loadedKey !== key;

  useEffect(() => {
    const endpoint = config.tabs[activeTab].endpoint;
    let cancelled = false;

    fetch(buildUrl(endpoint), TMDB_OPTIONS)
      .then((res) => res.json())
      .then((res) => {
        if (!cancelled) {
          setItems(res.results || []);
          setError(null);
          setLoadedKey(key);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems([]);
          setError("Failed to load content. Please try again.");
          setLoadedKey(key);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [config, activeTab, key]);

  return (
    <div className="min-h-screen bg-[#181818] text-white px-4 md:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6">{config.title}</h1>

      <div className="flex flex-wrap gap-3 mb-8">
        {config.tabs.map((tab, index) => (
          <button
            key={tab.label}
            onClick={() => setActiveTab(index)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition ${
              activeTab === index
                ? "bg-[#e50914] text-white"
                : "bg-[#232323] text-gray-300 hover:bg-[#333]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading && <p className="text-gray-400">Loading...</p>}

      {!loading && error && <p className="text-red-500">{error}</p>}

      {!loading && !error && items.length === 0 && (
        <p className="text-gray-400">No content available.</p>
      )}

      {!loading && !error && items.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item) => (
            <Link
              to={linkFor(item, type)}
              key={item.id}
              className="bg-[#232323] rounded-lg overflow-hidden hover:scale-105 transition duration-300"
            >
              {item.poster_path ? (
                <img
                  src={movieImageUrl(item.poster_path, "w500")}
                  alt={item.title || item.name}
                  className="w-full h-64 object-cover"
                />
              ) : (
                <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-xs text-gray-400">
                  No Poster
                </div>
              )}
              <div className="p-3">
                <h3 className="text-sm font-semibold truncate">{item.title || item.name}</h3>
                <p className="text-xs text-gray-400">
                  {(item.release_date || item.first_air_date || "").slice(0, 4) || "N/A"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
