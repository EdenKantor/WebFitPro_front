import { useInfoPageLogic } from "../utils/InfoPageLogic";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import FormField from "../components/FormField";
import ActionButton from "../components/ActionButton";
import Message from "../components/Message";

const InfoPage = () => {
  // Import logic hooks from InfoPageLogic
  const {
    age,
    setAge,
    height,
    setHeight,
    weight,
    setWeight,
    bmi,
    errorMessage,
    successMessage,
    handleUpdate,
  } = useInfoPageLogic();

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Title */}
        <Title text="My Info" />

        {/* Subtitle */}
        <Subtitle text="Update your personal information." />

        {/* Display BMI */}
        <p className="text-xl text-center text-green-500 font-semibold">
          Your BMI: <span className="text-3xl">{bmi}</span>
        </p>

        {/* Form Fields */}
        <div className="w-full max-w-sm space-y-4">
          {/* Age */}
          <FormField
            label="Age"
            placeholder="Enter your age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          {/* Height */}
          <FormField
            label="Height (cm)"
            placeholder="Enter your height"
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />

          {/* Weight */}
          <FormField
            label="Weight (kg)"
            placeholder="Enter your weight"
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>

        {/* Error Message */}
        <Message message={errorMessage} />

        {/* Success Message */}
        <Message message={successMessage} type="success" />

        {/* Update Button */}
        <ActionButton
          label="Update"
          iconClass="fas fa-save"
          onClick={handleUpdate}
          className="px-6 py-2 bg-green-400 hover:bg-green-500 text-white rounded-lg"
        />
      </div>
    </div>
  );
};

export default InfoPage;
