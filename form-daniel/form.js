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

  const updateStepHeight = () => {
    stepsContainer.style.height = steps[currentStep].offsetHeight + "px";
  };

  const updateProgress = () => {
    let width = currentStep / (stepIndicators.length - 1);
    progress.style.transform = `scaleX(${width})`;

    updateStepHeight();

    stepIndicators.forEach((indicator, index) => {
      indicator.classList.toggle("current", currentStep === index);
      indicator.classList.toggle("done", currentStep > index);
    });

    steps.forEach((step, index) => {
      step.style.transform = `translateX(-${currentStep * 100}%)`;
      step.classList.toggle("current", currentStep === index);
    });

    updateButtons();
    syncPcdLayout();
  };

  const updateButtons = () => {
    prevButton.hidden = currentStep === 0;
    nextButton.hidden = currentStep >= stepIndicators.length - 1;
    submitButton.hidden = !nextButton.hidden;
  };

  window.addEventListener("resize", () => {
    requestAnimationFrame(updateStepHeight);
  });

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

function syncPcdLayout() {
  const formWizard = document.querySelector(".form-wizard");
  const pcdStep = document.getElementById("pcdBox")?.closest(".step");
  const pcdYes = document.querySelector('input[name="pcd"][value="sim"]');

  if (!formWizard || !pcdStep || !pcdYes) {
    return;
  }

  formWizard.classList.toggle(
    "pcd-compact",
    pcdStep.classList.contains("current") && pcdYes.checked
  );
}

function refreshWizardHeight() {
  const currentStep = document.querySelector(".step.current");
  const stepsContainer = document.querySelector(".steps-container");

  if (currentStep && stepsContainer) {
    stepsContainer.style.height = currentStep.offsetHeight + "px";
  }
}

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

document.getElementById("workStatus").addEventListener("change", function (e) {
  const val = e.target.value;
  const contribBox = document.getElementById("contribuicaoBox");
  const desempregoBox = document.getElementById("desempregoBox");

  contribBox.classList.remove("visible");
  desempregoBox.classList.remove("visible");

  if (["formal", "mei"].includes(val)) {
    contribBox.classList.add("visible");
  } else if (val === "desempregado") {
    desempregoBox.classList.add("visible");
  }

  refreshWizardHeight();
});

function toggleDependentes(show) {
  const box = document.getElementById("dependentesBox");
  if (show) {
    box.classList.add("visible");
    document.getElementById("qtdDependentes").required = true;
  } else {
    box.classList.remove("visible");
    document.getElementById("qtdDependentes").required = false;
    document.getElementById("qtdDependentes").value = "";
    document.getElementById("idadesDependentes").value = "";
  }

  refreshWizardHeight();
}

// Lógica condicional: PCD
function togglePCD(show) {
  const box = document.getElementById("pcdBox");

  if (show) {
    box.classList.add("visible");
    document.getElementById("tipoDeficiencia").required = true;
  } else {
    box.classList.remove("visible");
    document.getElementById("tipoDeficiencia").required = false;
    document.getElementById("tipoDeficiencia").value = "";
  }

  syncPcdLayout();
  refreshWizardHeight();
}

// Lógica condicional: Doenças (desmarcar "nenhuma" se marcar outras)
function toggleOutrasDoencas(checkbox) {
  if (checkbox.checked) {
    document
      .querySelectorAll('input[name="doencas"]:not([value="nenhuma"])')
      .forEach((cb) => (cb.checked = false));
  }
}
