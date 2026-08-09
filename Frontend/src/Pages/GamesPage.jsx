import { Gamepad2 } from "lucide-react";

const GamesPage = () => {
    return (
        <div className="min-h-screen bg-[#181818] text-white flex flex-col items-center justify-center px-4 py-20 text-center">
            <Gamepad2 className="w-16 h-16 text-[#e50914] mb-6" />
            <h1 className="text-3xl font-bold mb-4">Games</h1>
            <p className="text-gray-400 max-w-md">
                Game content is coming soon. TMDB only provides movie and TV show data, so this section is a
                placeholder until a games database API (such as RAWG) is integrated.
            </p>
        </div>
    );
};

export default GamesPage;
