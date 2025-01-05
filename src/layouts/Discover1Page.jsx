import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";

const Discover1Page = () => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Title */}
        <Title text="Discover Workouts" />

        {/* Subtitle */}
        <Subtitle text="Explore categories and focus your training on specific areas!" />

        {/* Button Grid Section */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-6">
          {/* Hands */}
          <ActionButton
            label="Hands"
            iconClass="fas fa-hand-paper"
            onClick={() => navigate("/workouts/hands")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          {/* Chest */}
          <ActionButton
            label="Chest"
            iconClass="fas fa-heart"
            onClick={() => navigate("/workouts/chest")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          {/* Shoulders */}
          <ActionButton
            label="Shoulders"
            iconClass="fas fa-arrows-alt-v"
            onClick={() => navigate("/workouts/shoulders")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          {/* Legs */}
          <ActionButton
            label="Legs"
            iconClass="fas fa-running"
            onClick={() => navigate("/workouts/legs")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          {/* Stomach */}
          <ActionButton
            label="Stomach"
            iconClass="fas fa-dna"
            onClick={() => navigate("/workouts/stomach")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          {/* Full Body */}
          <ActionButton
            label="Full Body"
            iconClass="fas fa-dumbbell"
            onClick={() => navigate("/workouts/full-body")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Discover1Page;
