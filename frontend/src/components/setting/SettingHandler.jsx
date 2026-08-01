import Profile from "./Profile";
import Security from "./Security";
import Preferences from "./Preferences";

const SettingsHandler = () => {
  return (
    <div className="w-full p-6 flex flex-col gap-8 overflow-y-auto">
      <h1 className="text-3xl font-bold text-white flex-1 ">
        ⚙ Settings
      </h1>

      <Profile />
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