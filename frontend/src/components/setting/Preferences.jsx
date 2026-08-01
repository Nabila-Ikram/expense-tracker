import React from "react";

const Preferences = () => {
  return (
    <div
      className="rounded-2xl border border-white backdrop-blur-md
                 shadow-2xl p-6 text-white"
    >
      <h2 className="text-2xl font-bold mb-6">
        ⚙️ Preferences
      </h2>

      <div className="grid grid-cols-2 gap-6">
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
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500
                       bg-transparent"
          >
            <option className="text-black">Dark</option>
            <option className="text-black">Light</option>
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