import { useLocation } from 'wouter';
import { useUserHomePageLogic } from "../utils/UserHomePageLogic";
import { useState, useEffect } from "preact/hooks";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import LoadingSpinner from "../components/LoadingSpinner";
import { getFromSessionStorage } from "../utils/LocalSessionHelper"; 

const UserHomePage = () => {
  const [, navigate] = useLocation(); // Use Wouter's navigation

  // Use the custom hook to fetch quote data
  const { quote, author, fetchQuote } = useUserHomePageLogic();

  // Loading states
  const [loading, setLoading] = useState(true);

  // Retrieve username from session storage
  const userData = getFromSessionStorage("signedUserData");
  const userName = userData?.userName || "Guest"; // Default to "Guest" if no data found

  useEffect(() => {
    const loadQuoteData = async () => {
      await fetchQuote(); // Fetch quote line from backend
      setLoading(false); // Turn off loading spinner after data is loaded
    };
    loadQuoteData(); // Call async function
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center space-y-10 p-6">
        <Title text={`HELLO USER ${userName}!`} />
        <Subtitle text={`"${quote}"`} />
        <p className="italic text-lg text-black dark:text-white">- {author}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <ActionButton
            label="Discover"
            iconClass="fas fa-compass"
            onClick={() => navigate("/discover1")}
            className="w-full sm:w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
          <ActionButton
            label="Continue"
            iconClass="fas fa-dumbbell"
            onClick={() => navigate("/routine")}
            className="w-full sm:w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
          <ActionButton
            label="My Info"
            iconClass="fas fa-smile"
            onClick={() => navigate("/my-info")}
            className="w-full sm:w-32 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-green-400 text-white rounded-lg hover:bg-green-500 shadow-lg"
          />
        </div>
        {userName === "admin" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <ActionButton
              label="Pending Users"
              iconClass="fas fa-user-clock"
              onClick={() => navigate("/PendingUsers")}
              className="w-full sm:w-40 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 shadow-lg"
            />
            <ActionButton
              label="Manage Users"
              iconClass="fas fa-users-cog"
              onClick={() => navigate("/ManageUsers")}
              className="w-full sm:w-40 h-32 flex flex-col justify-center items-center text-center px-4 py-4 bg-blue-400 text-white rounded-lg hover:bg-blue-500 shadow-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default UserHomePage;