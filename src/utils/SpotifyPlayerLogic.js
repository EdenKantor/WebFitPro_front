import { createContext, useContext, useState, useEffect } from "react";

const SpotifyContext = createContext();

export const SpotifyProvider = ({ children }) => {
  // State to track whether the player is playing or paused
  const [isPlaying, setIsPlaying] = useState(true); // Default: play automatically

  // Toggle Play/Pause Function
  const togglePlay = () => {
    setIsPlaying((prev) => !prev); // Toggle between true and false
  };

  /**
   * Load play state from localStorage (persistent across refresh)
   * Runs only on the first render.
   */
  useEffect(() => {
    const savedState = localStorage.getItem("spotifyIsPlaying");
    if (savedState !== null) {
      setIsPlaying(JSON.parse(savedState)); // Restore saved state
    }
  }, []);

  /**
   * Save play state to localStorage whenever 'isPlaying' changes.
   */
  useEffect(() => {
    localStorage.setItem("spotifyIsPlaying", JSON.stringify(isPlaying));
  }, [isPlaying]);

  // Provide the state and toggle function to the rest of the app
  return (
    <SpotifyContext.Provider value={{ isPlaying, togglePlay }}>
      {children}
    </SpotifyContext.Provider>
  );
};

/**
 * Custom Hook: useSpotify
 * Allows any component to access the Spotify context.
 * Usage: const { isPlaying, togglePlay } = useSpotify();
 */
export const useSpotify = () => {
  return useContext(SpotifyContext);
};
