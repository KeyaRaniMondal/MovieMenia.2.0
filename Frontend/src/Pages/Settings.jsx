import { useState } from "react";
import { Bell, Moon, Settings as SettingsIcon, Shield, User } from "lucide-react";
import { useAuthStore } from "../store/authStore";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useTheme();
  const darkMode = theme === "dark";
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <div className="min-h-screen bg-[var(--page)] text-[var(--ink)] px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <SettingsIcon className="w-10 h-10 text-[#e50914]" />
          <h1 className="text-3xl font-bold">Settings</h1>
        </div>

        <div className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)] mb-6">
          <h2 className="flex items-center gap-2 font-semibold mb-4">
            <User className="w-5 h-5 text-[#e50914]" /> Account
          </h2>
          <div className="flex items-center gap-4">
            <img
              src={
                user?.avatar ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.username || "user")}`
              }
              alt="User Avatar"
              className="w-14 h-14 rounded-full border-2 border-[#e50914]"
            />
            <div>
              <p className="font-semibold">{user?.username || "Guest"}</p>
              <p className="text-[var(--muted)] text-sm">{user?.email || "Not signed in"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#e50914]" />
              <div>
                <p className="font-semibold">Email Notifications</p>
                <p className="text-[var(--muted)] text-sm">Get updates about new movies and recommendations</p>
              </div>
            </div>
            <button
              onClick={() => setEmailNotif(!emailNotif)}
              className={`w-12 h-7 rounded-full relative transition-colors ${emailNotif ? "bg-[#e50914]" : "bg-[#555]"}`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${emailNotif ? "left-6" : "left-1"}`}
              />
            </button>
          </div>

          <div className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-[#e50914]" />
              <div>
                <p className="font-semibold">Dark Mode</p>
                <p className="text-[var(--muted)] text-sm">{darkMode ? "Currently using the dark theme" : "Currently using the light theme"}</p>
              </div>
            </div>
            <button
              onClick={toggleTheme}
              className={`w-12 h-7 rounded-full relative transition-colors ${darkMode ? "bg-[#e50914]" : "bg-[#555]"}`}
            >
              <span
                className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all ${darkMode ? "left-6" : "left-1"}`}
              />
            </button>
          </div>

          <div className="bg-[var(--surface)] rounded-lg p-5 border border-[var(--line)] flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#e50914]" />
            <div>
              <p className="font-semibold">Privacy & Security</p>
              <p className="text-[var(--muted)] text-sm">Manage password and connected Google account</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
