import Profile from "./Profile";
import Security from "./Security";
import Preferences from "./Preferences";
import { useEffect, useState } from "react";
import { API_URL } from "../../api";
const SettingsHandler = () => {
 const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const email = loggedInUser.email;

const [profile, setProfile] = useState(null);

async function fetchProfile() {
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

      <div className="flex justify-center ">
        <button
          className="w-full max-w-xs h-12 rounded-md bg-linear-to-r
                     from-orange-500 to-pink-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsHandler;