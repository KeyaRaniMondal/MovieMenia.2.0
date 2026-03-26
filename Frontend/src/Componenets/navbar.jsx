import { HelpCircle, LogOut, Search, Settings } from "lucide-react";
import logo from "../assets/logo.jpg"
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const Navbar = () => {
    const { user, logout } = useAuthStore()
    const avatarURL = user ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.username)}` : ""



    return (
        <div>
            <nav className="bg-black text-gray-400 flex justify-between items-center p-5 h-20 text-sm md:text-[15px] font-medium text-nowrap">
                <label>
                    <img src={logo} alt="NetFlix Logo" className="w-24 cursor-pointer" />
                </label>
                <ul className="hidden xl:flex space-x-6 ">
                    <li className="cursor-pointer hover:text-[#e50914]">Home</li>
                    <li className="cursor-pointer hover:text-[#e50914]">Tv Shows</li>
                    <li className="cursor-pointer hover:text-[#e50914]">Movies</li>
                    <li className="cursor-pointer hover:text-[#e50914]">Anime</li>
                    <li className="cursor-pointer hover:text-[#e50914]">Games</li>
                    <li className="cursor-pointer hover:text-[#e50914]">New & Popular</li>
                    <li className="cursor-pointer hover:text-[#e50914]">Upcoming</li>
                </ul>

                <div className="flex items-center space-x-4 relative">
                    <div className="relative hidden md:inline-flex">
                        <input type="text" className="bg-[#333333] px-4 py-2 border rounded-full min-w-72 pr-10 outline-none" placeholder="Search......" />
                        <Search className="absolute top-2 right-4 w-5 h-5" />
                    </div>
                    <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">Get AI Movie Picks</button>
                    {/* {
                        !user?<Link to={"/signin"}>
                    <button className="border px-5 py-2 text-white cursor-pointer">Sign In</button>
                    </Link>:<div><img src={avatarUrl} alt="" className="w-10 h-10 rounded-full border-2 cursor-pointer" /></div>

                    } */}
                    <img
                        src={avatarURL}
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-10 h-10 rounded-full border-2 border-[#E50914] cursor-pointer"
                        alt="User Avatar"
                    />



                </div>
            </nav>
        </div>

    )
}
export default Navbar;
