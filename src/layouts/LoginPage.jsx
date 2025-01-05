import { useNavigate } from "react-router-dom";
import { useState } from "preact/hooks"; 
import { useLoginLogic } from "../utils/LoginPageLogic";
import Title from "../components/Title";
import ActionButton from "../components/ActionButton";
import UsernameInput from "../components/UsernameInput";
import PasswordInput from "../components/PasswordInput";
import Message from "../components/Message";

let signedUserData = {}; // Global variable to hold data

const LoginPage = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isPasswordVisible,
    togglePasswordVisibility,
    message,
    handleLogin,
  } = useLoginLogic(); 

  const navigate = useNavigate(); // Navigation instance
  const [loading, setLoading] = useState(false); // Loading spinner state

    // Handle Login Button Click
    const handleLoginClick = async () => {
      setLoading(true); // Start loading spinner
    
      try {
        await handleLogin(navigate); // Wait for login process to complete
      } catch (error) {
        console.error('Login error:', error); // Log unexpected errors
      } finally {
        setLoading(false); // Stop spinner after login process
        // Update userData with Registration1Page inputs
      signedUserData = {
        userName: username,
      };

      console.log("login Data Saved: ", signedUserData); // Debugging log
      }
    };
  return (
    <div className="bg-white text-black dark:bg-gray-900 dark:text-white transition-all duration-300 min-h-screen">
      {/* Content Wrapper with Padding for TopBar */}
      <div className="pt-20 flex flex-col items-center min-h-screen space-y-8 p-6">
        {/* Title */}
        <Title text="Login to Your Account" />

        {/* Form Fields */}
        <div className="w-full max-w-sm space-y-6">
          {/* Username Input */}
          <UsernameInput
            label="Username"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          {/* Password Input */}
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            toggleVisibility={togglePasswordVisibility}
            isPasswordVisible={isPasswordVisible}
          />
        </div>

        {/* Login Button or Loading Spinner */}
        {loading ? (
          <div className="w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <ActionButton
            label="Login"
            iconClass="fas fa-sign-in-alt"
            onClick={handleLoginClick}
          />
        )}

        {/* Message Component */}
        <Message message={message} />
      </div>
    </div>
  );
};

export { signedUserData }; // Export signedUserData globally
export default LoginPage;
