document.addEventListener("DOMContentLoaded", () => {
  const progress = document.querySelector(".progress");
  const stepsContainer = document.querySelector(".steps-container");
  const steps = document.querySelectorAll(".step");
  const stepIndicators = document.querySelectorAll(".progress-container li");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");
  const submitButton = document.querySelector(".submit-btn");

  document.documentElement.style.setProperty("--steps", stepIndicators.length);

  let currentStep = 0;

  const updateProgress = () => {
    let width = currentStep / (stepIndicators.length - 1);
    progress.style.transform = `scaleX(${width})`;

    stepsContainer.style.height = steps[currentStep].offsetHeight + "px";

    stepIndicators.forEach((indicator, index) => {
      indicator.classList.toggle("current", currentStep === index);
      indicator.classList.toggle("done", currentStep > index);
    });

    steps.forEach((step, index) => {
      step.style.transform = `translateX(-${currentStep * 100}%)`;
      step.classList.toggle("current", currentStep === index);
    });

    updateButtons();
  };

  const updateButtons = () => {
    prevButton.hidden = currentStep === 0;
    nextButton.hidden = currentStep >= stepIndicators.length - 1;
    submitButton.hidden = !nextButton.hidden;
  };

  prevButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentStep > 0) {
      currentStep--;
      updateProgress();
    }
  });

  nextButton.addEventListener("click", (e) => {
    e.preventDefault();

    if (currentStep < stepIndicators.length - 1) {
      currentStep++;
      updateProgress();
    }
  });

  updateProgress();
});

const daySelect = document.getElementById("day");
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option");
  const value = String(i).padStart(2, "0");
  option.value = value;
  option.textContent = value;
  daySelect.appendChild(option);
}

const yearSelect = document.getElementById("year");
for (let year = 2026; year >= 1900; year--) {
  const option = document.createElement("option");
  option.value = String(year);
  option.textContent = String(year);
  yearSelect.appendChild(option);
}