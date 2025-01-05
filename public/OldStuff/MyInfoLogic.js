// Theme Toggle Logic
const html = document.documentElement;
const themeToggleButton = document.getElementById('toggle-theme');

// Tailwind's CDN configuration to enable dark mode
tailwind.config = {
  darkMode: 'class',
};

// Set the initial theme based on localStorage if it exists
if (localStorage.getItem('theme') === 'dark') {
  html.classList.add('dark');
}

// Toggle dark mode and save preference in localStorage
themeToggleButton.addEventListener('click', () => {
  html.classList.toggle('dark');

  // Save the theme preference to localStorage
  if (html.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// BMI Calculation Logic
function calculateBMI(height, weight) {
    return (weight / ((height / 100) ** 2)).toFixed(1); // BMI = weight (kg) / height (m)^2
}

// Updating the data logic
function updateData() {
  const ageInput = document.getElementById("age");
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");
  const errorMessage = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  const age = parseInt(ageInput.value);
  const height = parseInt(heightInput.value);
  const weight = parseInt(weightInput.value);

  // Clear previous error message and success message
  errorMessage.classList.add("hidden");
  errorMessage.textContent = "";
  successMessage.classList.add("hidden");
  successMessage.textContent = "";

  // Input validation
  if (isNaN(age) || age < 1 || age > 200 ) {
      errorMessage.textContent = "Please enter a valid age.";
      errorMessage.classList.remove("hidden");
      return;
  }
  if (isNaN(height) || height < 80 || height > 300) {
      errorMessage.textContent = "Please enter a valid height.";
      errorMessage.classList.remove("hidden");
      return;
  }
  if (isNaN(weight) || weight < 5 || weight > 200) {
      errorMessage.textContent = "Please enter a valid weight.";
      errorMessage.classList.remove("hidden");
      return;
  }
  else{
    successMessage.textContent = "The info was successfully updated!";
    successMessage.classList.remove("hidden");
 
    // Calculate the new BMI
    const bmi = calculateBMI(height, weight);

    // Display the new BMI
    document.getElementById("bmi-value").textContent = `Your BMI: ${bmi}`;

    // Save to localStorage
    localStorage.setItem("age", age);
    localStorage.setItem("height", height);
    localStorage.setItem("weight", weight);
    localStorage.setItem("bmi", bmi);
    return;

  }
}


// Load data from localStorage
function loadData() {
    const age = localStorage.getItem("age");
    const height = localStorage.getItem("height");
    const weight = localStorage.getItem("weight");
    const bmi = localStorage.getItem("bmi");

    // Display the data if available
    if (age && height && weight && bmi) {
      document.getElementById("age").value = age;
      document.getElementById("height").value = height;
      document.getElementById("weight").value = weight;
      document.getElementById("bmi-value").textContent = `Your BMI: ${bmi}`;
    }
}

// Load data when the page loads
window.onload = function() {
    loadData();

    // Attach event listener to update button
    document.getElementById("update-button").addEventListener("click", updateData);
};
