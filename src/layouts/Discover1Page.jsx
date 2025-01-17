import { useLocation } from 'wouter'; 
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import { saveToSessionStorage } from "../utils/LocalSessionHelper"; 

const Discover1Page = () => {
  const [, navigate] = useLocation(); 

  const handleBodyAreaChoice = (bodyArea) => {
    // Save bodyAreaChoice (button name category) to sessionStorage
    const bodyAreaChoice = {
      bodyArea: bodyArea,
    };
    saveToSessionStorage("bodyAreaChoice", bodyAreaChoice);

    console.log("The bodypart is: ", bodyAreaChoice.bodyArea);
    navigate('/discover2');
  };

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">

      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">

        <Title text="Discover Workouts" />

        <Subtitle text="Explore categories and focus your training on specific areas!" />

        {/* Button Grid Section */}
        <div className="grid grid-cols-3 gap-6 w-full max-w-lg mt-6">

          <ActionButton
            label="Hands"
            iconClass="fas fa-hand-paper"
            onClick={() => handleBodyAreaChoice("Hands")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          <ActionButton
            label="Chest"
            iconClass="fas fa-heart"
            onClick={() => handleBodyAreaChoice("Chest")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          <ActionButton
            label="Shoulders"
            iconClass="fas fa-arrows-alt-v"
            onClick={() => handleBodyAreaChoice("Shoulders")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          <ActionButton
            label="Legs"
            iconClass="fas fa-running"
            onClick={() => handleBodyAreaChoice("Legs")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          <ActionButton
            label="Stomach"
            iconClass="fas fa-dna"
            onClick={() => handleBodyAreaChoice("Stomach")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />

          <ActionButton
            label="Full Body"
            iconClass="fas fa-dumbbell"
            onClick={() => handleBodyAreaChoice("Full Body")}
            className="p-6 bg-green-400 text-white rounded-lg hover:bg-green-500 flex flex-col justify-center items-center shadow-lg text-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Discover1Page;
