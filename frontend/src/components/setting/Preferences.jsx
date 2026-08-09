import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
const Preferences = () => {
  const {theme,setTheme}=useContext(ThemeContext)
 
  return (
    <div
     className={`rounded-2xl backdrop-blur-md shadow-2xl p-4 md:p-6
${
  theme === "dark"
    ? "border border-white text-white"
    : "border border-gray-300 bg-white/60 text-black"
}`}
    >
      <h2 className="text-xl md:text-2xl font-bold mb-6">
        ⚙️ Preferences
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Currency */}
        <div className="flex flex-col gap-2">
          <label htmlFor="currency">Currency</label>

          <select
            id="currency"
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500
                       bg-transparent"
          >
            <option className="text-black">PKR</option>
            <option className="text-black">USD</option>
            <option className="text-black">EUR</option>
            <option className="text-black">GBP</option>
          </select>
        </div>

        {/* Theme */}
        <div className="flex flex-col gap-2">
          <label htmlFor="theme">Theme</label>

          <select
            id="theme"
            value={theme}
            onChange={(e)=>{
setTheme(e.target.value)
            }}
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500
                       bg-transparent"
          >
            <option value="dark" className="text-black">Dark</option>
            <option  value="light" className="text-black">Light</option>
          </select>
        </div>
      </div>

      {/* Notifications */}
      <div className="mt-8">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            className="w-5 h-5 accent-purple-600"
          />
          <span>Enable Notifications</span>
        </label>
      </div>
    </div>
  );
};

export default Preferences;