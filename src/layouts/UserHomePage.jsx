import { useNavigate } from "react-router-dom"; 
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";

const UserHomePage = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col items-center space-y-10 p-6">
        {/* Title */}
        <Title text="HELLO USER!" />

        {/* Subtitle/Quote */}
        <Subtitle text='"Some people want it to happen, some wish it would happen, others make it happen."' />
        <p className="italic text-lg text-black dark:text-white">- Michael Jordan</p>

        <div className="grid grid-cols-3 gap-6">
          {/* Discover Button */}
          <ActionButton
            label="Discover"
            iconClass="fas fa-compass"
            onClick={() => navigate("/discover1")} // Navigate to Discover1Page
            className="w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
          {/* Continue Routine Button */}
          <ActionButton
            label="Continue"
            iconClass="fas fa-dumbbell"
            onClick={() => navigate("/continue-routine")} // Placeholder for routine page
            className="w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
          {/* My Info Button */}
          <ActionButton
            label="My Info"
            iconClass="fas fa-smile"
            onClick={() => navigate("/my-info")} // Placeholder for My Info page
            className="w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
