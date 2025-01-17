import { useState } from "preact/hooks";

export const useLoginLogic = () => {
  // States for username, password, visibility, and messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

 // Handle login validation
 const handleLogin = async (navigate) => {
  return new Promise(async (resolve, reject) => {
    // Check for missing username or password
    if (!username || !password) {
      setMessage("Please enter both username and password.");
      resolve();
      return;
    }

    const url = `https://web-fit-pro-back.vercel.app/api/login?username=${username}&password=${password}`;

    try {
      const response = await fetch(url, { method: 'GET' });

      if (response.status === 200) {
        const data = await response.json();
        // Redirect based on the registration status of the user
        console.log(data.user.isRegistered);
        if (data.user.isRegistered === 'N') {
          navigate('/NotSoFast');
        } else {
          navigate('/user-home');
        }
        resolve();
      } else if (response.status === 401 || response.status === 404) {
        setMessage("Incorrect username or password. Please try again.");
        resolve();
      } else {
        setMessage("An unexpected error occurred. Please try again later.");
        resolve();
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred while trying to sign in. Please check your network connection and try again.");
      resolve();
    }
  });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    isPasswordVisible,
    togglePasswordVisibility,
    message,
    handleLogin,
  };
};
