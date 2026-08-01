import React from "react";

const Profile = () => {
  return (
    <div
      className="rounded-2xl border border-white backdrop-blur-md
                 shadow-2xl p-6 text-white"
    >
      <h2 className="text-2xl font-bold mb-6">
        👤 Profile Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter your full name"
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 rounded-md p-3
                       outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;