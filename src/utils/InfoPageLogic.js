import { useState, useEffect } from "preact/hooks";

// Custom hook for InfoPage logic
export const useInfoPageLogic = () => {
  // States for form fields
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Load saved user data on initial render
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("registrationData")) || {};
    setAge(savedData.age || "");
    setHeight(savedData.height || "");
    setWeight(savedData.weight || "");
    calculateBMI(savedData.height, savedData.weight);
  }, []);

  // Calculate BMI
  const calculateBMI = (height, weight) => {
    if (height && weight) {
      const bmiValue = (weight / ((height / 100) ** 2)).toFixed(1);
      setBmi(bmiValue);
    }
  };

  // Validate inputs
  const validateInputs = () => {
    if (!age || age <= 0) return "Please enter a valid age.";
    if (!height || height <= 0) return "Please enter a valid height.";
    if (!weight || weight <= 0) return "Please enter a valid weight.";
    return "";
  };

  // Handle form submission
  const handleUpdate = () => {
    const error = validateInputs();
    if (error) {
      setErrorMessage(error);
      setSuccessMessage(""); // Clear success message
    } else {
      setErrorMessage("");
      setSuccessMessage("Details updated successfully!");

      // Update localStorage and recalculate BMI
      const updatedData = { age, height, weight };
      localStorage.setItem("registrationData", JSON.stringify(updatedData));
      calculateBMI(height, weight);
    }
  };

  return {
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
  };
};
