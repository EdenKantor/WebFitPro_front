import { useState } from "preact/hooks";

const apiUrl = "https://web-fit-pro-back.vercel.app/api/continueRoutine";

export const useContinueRoutineLogic = () => {
  // Workout Video Data
  const [workouts, setWorkouts] = useState([]);
  const [doneArray, setDoneArray] = useState([]);
  const [likeArray, setLikeArray] = useState([]);
  const [userNameUser, setUsername] = useState("");

  // Popup states
  const [isOpen, setIsOpen] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  // Error state
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch user session info from backend
  const fetchUserSessionInfo = async (userName) => {
    try {
      const response = await fetch(
        `${apiUrl}?userName=${userName}&action=getInitalUserSessionData`,
        { method: "GET" }
      );
      const data = await response.json();
      if (response.ok) {
        setWorkouts(data.videos);
        setDoneArray(data.checks);
        setLikeArray(data.likes);
        setUsername(userName);
        setErrorMessage(""); // Clear any previous error
      } else {
        setErrorMessage(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please check your connection.");
    }
  };

  const handleDone = async (index, doneAction) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userNameUser,
          index: index,
          doneAction: doneAction,
          action: "patchDone",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(""); // Clear error on success
      } else {
        setErrorMessage(data.message || "Failed to update exercise status.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  const handleLike = async (url, likeAction) => {
    try {
      const response = await fetch(apiUrl, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: userNameUser,
          url: url,
          likeAction: likeAction,
          action: "patchLikes",
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage(""); // Clear error on success
      } else {
        setErrorMessage(data.message || "Failed to update like status.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        `${apiUrl}?userName=${userNameUser}&action=getDoneVideoArray`,
        { method: "GET" }
      );
      const data = await response.json();

      if (response.ok) {
        if (data.counterChecks === 3) {
          setShowSuccess(true);
          setPopupMessage("Completed all exercises! Well done champ!");
          setIsOpen(true);
          setErrorMessage(""); // Clear error on success
        } else {
          setIsError(true);
          setPopupMessage("Almost there! Please complete all exercises.");
          setIsOpen(true);
        }
      } else {
        setErrorMessage(data.message || "Failed to submit exercises.");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  const handlePopupClose = () => {
    if (showSuccess) {
      setIsOpen(false);
      setShowSuccess(false);
      setIsError(false);
    } else {
      setIsOpen(false);
    }
  };

  return {
    workouts,
    doneArray,
    likeArray,
    fetchUserSessionInfo,
    handleSubmit,
    handleLike,
    handleDone,
    isOpen,
    handlePopupClose,
    popupMessage,
    showSuccess,
    isError,
    errorMessage, // Expose error message
  };
};
