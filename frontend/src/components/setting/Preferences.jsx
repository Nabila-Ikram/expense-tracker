import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { DateContext } from "../../context/PreferencesProvider";

const Preferences = () => {
  const {theme,setTheme}=useContext(ThemeContext)
const {date,setDate}=useContext(DateContext)
 
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
          <label htmlFor="date pattern">Date format</label>

         <select  className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500
                       bg-transparent"
  value={date}
  onChange={(e) => setDate(e.target.value)}
>
  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
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

    </div>
  );
};

export default Preferences;