import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

const Security = () => {
  const {theme}=useContext(ThemeContext)
  return (
    <div
     className={`rounded-2xl backdrop-blur-md shadow-2xl p-6
${
  theme === "dark"
    ? "border border-white text-white"
    : "border border-gray-300 bg-white/60 text-black"
}`}
    >
      <h2 className="text-2xl font-bold mb-6">
        🔒 Security
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Current Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="currentPassword">
            Current Password
          </label>

          <input
            id="currentPassword"
            type="password"
            placeholder="Enter current password"
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* New Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword">
            New Password
          </label>

          <input
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 col-span-2">
          <label htmlFor="confirmPassword">
            Confirm Password
          </label>

          <input
            id="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Security;