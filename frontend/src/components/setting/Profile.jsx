import  { useContext } from "react";
import { ThemeContext } from "../../context/ThemeProvider";

const Profile = ({profile}) => {
  const {theme}=useContext(ThemeContext)

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
        👤 Profile Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
             value={profile?.owner_name || ""}
            placeholder="Enter your full name" readOnly
            className=" w-full border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email" readOnly
            placeholder="Enter your email"
            className="border w-full border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500"
                       value={profile?.email || ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;