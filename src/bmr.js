const BMRform = document.querySelector("#bmr-calculator");
BMRform.addEventListener("submit", (event) => calculateBMR(event));

const calculateBMR = (event) => {
  event.preventDefault();
  const weight = document.querySelector("#weight").value;
  const height = document.querySelector("#height").value;
  const age = document.querySelector("#age").value;
  if (weight !== "" && height !== "" && age != "") {
    const lowerBMR = calculateLowerBMR(weight, height, age);
    const upperBMR = calculateUpperBMR(weight, height, age);
    renderBMR(lowerBMR, upperBMR);
    setProgressBarMax(calculateAverageBMR(lowerBMR, upperBMR));
  }
}

const calculateLowerBMR = (weight, height, age) => {
  return Math.floor(655 + (4.35 * weight) + (4.7 * height) - (4.7 * age));
}

const calculateUpperBMR = (weight, height, age) => {
  return Math.floor(66 + (6.23 * weight) + (12.7 * height) - (6.8 * age));
}

const calculateAverageBMR = (lowerBMR, upperBMR) => {
  return Math.floor((lowerBMR + upperBMR) / 2);
}

const renderBMR = (lowerBMR, upperBMR) => {
  const lowerBMRSpan = document.querySelector("#lower-bmr-range");
  lowerBMRSpan.textContent = lowerBMR;
  const upperBMRSpan = document.querySelector("#higher-bmr-range");
  upperBMRSpan.textContent = upperBMR;
}

const setProgressBarMax = (averageBMR) => {
  const progressBar = document.querySelector("progress");
  progressBar.max = averageBMR;
}

const setProgressValue = () => {
  const totalCalories = getCalorieTotal();
  const progress = document.querySelector("progress");
  progress.value = totalCalories;
}

const getCalorieTotal = () => {
  const calorieCounts = document.querySelectorAll(".calorie-count");
  const totalCalories = [...calorieCounts].reduce((total, count) => {
    return total + parseInt(count.textContent);
  }, 0);
  return totalCalories;
}

const bmr = {
  setProgressValue: setProgressValue
}

