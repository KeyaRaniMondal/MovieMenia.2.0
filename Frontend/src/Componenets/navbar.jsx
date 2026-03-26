import { HelpCircle, LogOut, Search, Settings } from "lucide-react";
import logo from "../assets/logo.jpg"
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const avatarURL = user
    ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
      user.username
    )}`
    : null;

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => setShowMenu(!showMenu);

  const handleLogout = async () => {
    const message = await logout(); // Calls API and clears cookies
    alert(message);
    toggleMenu(); 
  };

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
          <button className="bg-[#e50914] px-5 py-2 text-white cursor-pointer">
            Get AI Movie Picks
          </button>

          {user ? (
            <>
              <img
                src={avatarURL}
                onClick={() => setShowMenu(!showMenu)}
                className="w-10 h-10 rounded-full border-2 border-[#E50914] cursor-pointer"
                alt="User Avatar"
              />

              {/* Conditional Rendering of the Dropdown Menu */}
              {showMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-[#232323] bg-opacity-95 rounded-lg z-50 shadow-lg py-4 px-3 flex flex-col gap-2 border border-[#333333]">
                  {/* User Information Section */}
                  <div className="flex flex-col items-center mb-2">
                    <span className="text-white font-semibold text-base">
                      {user.username}
                    </span>
                    <span className="text-xs text-gray-400">{user.email}</span>
                  </div>

                  {/* Menu Action Buttons */}
                  <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1D1C1C] gap-3 cursor-pointer">
                    <HelpCircle className="w-5 h-5" /> Help Center
                  </button>

                  <button className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1D1C1C] gap-3 cursor-pointer">
                    <Settings className="w-5 h-5" /> Settings
                  </button>

                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 rounded-lg text-white bg-[#181818] hover:bg-[#1D1C1C] gap-3 cursor-pointer"
                  >
                    <LogOut className="w-5 h-5" /> Log out
                  </button>
                </div>
              )}
            </>
          ) : (
            <Link to="/signin">
              <button className="border px-5 py-2 text-white cursor-pointer">
                Sign In
              </button>
            </Link>
          )}

        </div>
      </nav>
    </div>

  )
}
export default Navbar;
