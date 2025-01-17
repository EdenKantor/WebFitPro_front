import { useEffect, useState } from "preact/hooks";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import ActionButton from "../components/ActionButton";
import VideoContainer from "../components/VideoContainer";
import { useContinueRoutineLogic } from "../utils/ContinueRoutineLogic";
import { getFromSessionStorage } from "../utils/LocalSessionHelper";
import { useLocation } from "wouter";
import Popup from "../components/Popup";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const ContinueRoutine = () => {
  const {
    workouts,
    doneArray,
    likeArray,
    fetchUserSessionInfo,
    handleSubmit,
    handleDone,
    handleLike,
    isOpen,
    handlePopupClose,
    popupMessage,
    showSuccess,
    isError,
    errorMessage,
  } = useContinueRoutineLogic();

  const [, navigate] = useLocation();

  const [loading, setLoading] = useState(true);

  // Retrieve username from session storage
  const userData = getFromSessionStorage("signedUserData");
  const userName = userData?.userName || "";

  useEffect(() => {
    const loadUserData = async () => {
      if (userName) {
        await fetchUserSessionInfo(userName);
        setLoading(false);
      }
    };
    loadUserData();
  }, [userName]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text="Continue Routine" />
        <Subtitle text="Your Daily Workout - You Can Do It!" />
        
        {errorMessage && <Message message={errorMessage} type="error" />}

        <div className="space-y-8 w-full max-w-4xl">
          {workouts.map((workout, index) => (
            <VideoContainer
              key={index}
              id={index}
              title={workout.title}
              videoUrl={workout.url}
              category={workout.bodyPart}
              level={workout.difficulty}
              numOfLikes={workout.likeCount}
              done={doneArray[index]}
              liked={likeArray[index]}
              onDone={handleDone}
              onLike={handleLike}
            />
          ))}
        </div>

        <ActionButton
          label="Submit Workout"
          iconClass="fas fa-check-circle"
          className={`px-6 py-3 rounded-lg transition-all ${
            errorMessage
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 text-white hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          }`}
          onClick={handleSubmit}
          disabled={!!errorMessage} // Disable button when errorMessage is active
        />
      </div>

      <Popup
        isOpen={isOpen}
        onClose={handlePopupClose}
        message={popupMessage}
        showSuccess={showSuccess}
        backToHome={() => navigate("user-home")}
        isError={isError}
      />
    </div>
  );
};

export default ContinueRoutine;
