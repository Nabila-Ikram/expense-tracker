import React, { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeProvider";
import { API_URL } from "../../api";
const Security = () => {
 const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [message, setMessage] = useState("");
const [error, setError] = useState("");
const {theme}=useContext(ThemeContext)
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const email = loggedInUser?.email;
async function changePassword() {

  setMessage("");
  setError("");

  if (!currentPassword || !newPassword || !confirmPassword) {
    setError("Please fill in all fields");
    return;
  }

  if (newPassword !== confirmPassword) {
    setError("New passwords do not match");
    return;
  }

  try {
    const response = await fetch(
      `${API_URL}/change-password/${email}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
           "ngrok-skip-browser-warning": "true" 
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error);
      return;
    }

    setMessage(data.message);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {
    setError("Something went wrong");
  }
}
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
        🔒 Security
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current Password */}
        <div className="flex flex-col gap-2">
          <label htmlFor="currentPassword">
            Current Password
          </label>

         <input
  id="currentPassword"
  type="password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
  placeholder="Enter current password"
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
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  placeholder="Enter new password"
/>
        </div>

        {/* Confirm Password */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label htmlFor="confirmPassword">
            Confirm Password
          </label>

         <input
  id="confirmPassword"
  type="password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  placeholder="Confirm new password"
/>
        </div>
      </div>

      <button
  type="button"
  onClick={changePassword}
  className="mt-6 px-6 py-3 rounded-lg bg-purple-900 text-white
             hover:bg-purple-800 transition"
>
  Change Password
</button>
    </div>
  );
};

export default Security;