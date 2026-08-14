import Profile from "./Profile";
import Security from "./Security";
import Preferences from "./Preferences";
import { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { API_URL } from "../../api";
import { useNavigate } from "react-router-dom";
const SettingsHandler = () => {
 const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const email = loggedInUser?.email;
const navigate=useNavigate()
const [profile, setProfile] = useState(null);
const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  }

async function fetchProfile() {
     if (!email) {
            alert("Please login again.");
           return;
     }
    
  
  try {
    const response = await fetch(`${ API_URL }/profile/${email}`);
    const data = await response.json();

    if (response.ok) {
      setProfile(data);
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.log(error);
  }
}

useEffect(() => {
  fetchProfile();
}, [email]);


  return (
    <div className="w-full p-4 md:p-6 flex flex-col gap-6  md:gap-8 overflow-y-auto">
      <h1 className="text-2xl md:text-3xl  font-bold  flex-1 ">
        ⚙ Settings
      </h1>
  
      <Profile profile={profile}/>
      <Security />
      <Preferences />
      <div className="flex flex-col items-center gap-3 mt-8">

  {/* Save Changes */}
  <button
    type="submit"
    className="w-full max-w-sm h-12 rounded-xl
               bg-linear-to-r from-orange-500 to-pink-600
               text-white font-semibold
               shadow-lg shadow-pink-500/20
               transition-all duration-200
               hover:from-orange-600 hover:to-pink-700
               hover:shadow-xl hover:shadow-pink-500/30
               focus:outline-none focus:ring-2
               focus:ring-pink-400 focus:ring-offset-2"
  >
    Save Changes
  </button>

  {/* Logout */}
  <button
    type="button"
    onClick={handleLogout}
    className="w-full max-w-sm h-12 rounded-xl
               border border-purple-300/40
               bg-purple-900/80
               text-white font-semibold
               shadow-md
               transition-all duration-200
               hover:bg-purple-800
               hover:border-purple-200/60
               hover:shadow-lg
               focus:outline-none focus:ring-2
               focus:ring-purple-400 focus:ring-offset-2
               flex items-center justify-center gap-2"
  >
    <IoLogOutOutline size={21} />
    Logout
  </button>

</div>
    </div>
  );
};

export default SettingsHandler;