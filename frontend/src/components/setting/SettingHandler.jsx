import Profile from "./Profile";
import Security from "./Security";
import Preferences from "./Preferences";
import { useEffect, useState } from "react";

const SettingsHandler = () => {
 const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
const email = loggedInUser.email;

const [profile, setProfile] = useState(null);

async function fetchProfile() {
  try {
    const response = await fetch(`http://127.0.0.1:5000/profile/${email}`);
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
    <div className="w-full p-6 flex flex-col gap-8 overflow-y-auto">
      <h1 className="text-3xl font-bold  flex-1 ">
        ⚙ Settings
      </h1>
  
      <Profile profile={profile}/>
      <Security />
      <Preferences />

      <div className="flex justify-center ">
        <button
          className="w-60 h-12 rounded-md bg-linear-to-r
                     from-orange-500 to-pink-600"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default SettingsHandler;