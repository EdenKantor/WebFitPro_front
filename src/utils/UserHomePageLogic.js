import { useState } from "preact/hooks";

// API URL for fetching quotes
const url = "https://web-fit-pro-back-rose.vercel.app/api/homepage"; 

export const useUserHomePageLogic = () => {
  // State variables
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  // Fetch quote from backend
  const fetchQuote = async () => {
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.status === 200 && data.quote) {
        setQuote(data.quote.quote); // Set quote text
        setAuthor(data.quote.name || "Unknown"); // Set author
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error);
      setQuote("No quote available right now."); // Fallback quote
      setAuthor("Unknown");
    }
  };

  return {
    quote,
    author,
    fetchQuote, 
  };
};
