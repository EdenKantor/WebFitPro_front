import { useEffect, useState } from "preact/hooks";
import Title from "../components/Title";
import Subtitle from "../components/Subtitle";
import VideoContainer from "../components/VideoContainer";
import { getFromSessionStorage } from "../utils/LocalSessionHelper";
import { useDiscover2PageLogic } from "../utils/Discover2PageLogic";
import DropdownMenu from "../components/DropdownMenu";
import Message from "../components/Message";
import LoadingSpinner from "../components/LoadingSpinner";

const Discover2Page = () => {
  const {
    workouts,
    likeArray,
    fetchBodyPartVideos,
    handleLike,
    selectedSortParam,
    setSelectedSort,
    fetchSortedVideos,
    errorMessage,
  } = useDiscover2PageLogic();

  const [loading, setLoading] = useState(true);
  const [isSorting, setIsSorting] = useState(false); // State for sorting spinner

  // Retrieve data from session storage
  const userData = getFromSessionStorage("signedUserData");
  const bodyAreaChoice = getFromSessionStorage("bodyAreaChoice");

  const userName = userData?.userName || "";
  const bodyArea = bodyAreaChoice?.bodyArea || "Unknown";

  useEffect(() => {
    const loadUserData = async () => {
      if (userName && bodyArea) {
        await fetchBodyPartVideos(userName, bodyArea);
        setLoading(false);
      }
    };
    loadUserData();
  }, [userName, bodyArea]);

  useEffect(() => {
    const changeVideosOrderAfterSort = async () => {
      if (selectedSortParam !== "- Sort by -") {
        setIsSorting(true); // Show sorting spinner
        await fetchSortedVideos();
        setIsSorting(false); // Hide sorting spinner
      }
    };
    changeVideosOrderAfterSort();
  }, [selectedSortParam]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      <div className="flex flex-col items-center min-h-screen space-y-8 p-6">
        <Title text={`Our ${bodyArea} Exercises`} />
        <Subtitle text={`Discover all our exercises to train ${bodyArea}!`} />

        {/* Display Error Message */}
        {errorMessage && <Message message={errorMessage} type="error" />}

        {/* Dropdown Menu */}
        <div className="w-full max-w-4xl flex justify-center">
          <DropdownMenu
            options={[
              "Title (A->Z)",
              "Title (Z->A)",
              "Most Liked",
              "Least Liked",
              "Most Difficult",
              "Least Difficult",
            ]}
            selected={selectedSortParam}
            onSelect={(value) => {
              setSelectedSort(value);
            }}
            disabled={!!errorMessage} // Disable when errorMessage is active
          />
        </div>

        {/* Sorting Spinner */}
        {isSorting && <LoadingSpinner />}

        {/* Workout Cards */}
        <div className="space-y-8 w-full max-w-4xl">
          {workouts.map((workout, index) => (
            <VideoContainer
              id={index}
              title={workout.title}
              videoUrl={workout.url}
              category={workout.bodyPart}
              level={workout.difficulty}
              numOfLikes={workout.likeCount}
              liked={likeArray[index]}
              onLike={handleLike}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover2Page;
