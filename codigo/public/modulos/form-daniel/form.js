document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".form-wizard");
  const progress = document.querySelector(".progress");
  const stepsContainer = document.querySelector(".steps-container");
  const steps = Array.from(document.querySelectorAll(".step"));
  const stepIndicators = Array.from(
    document.querySelectorAll(".progress-container li"),
  );
  const prevButton = document.querySelector(".prev-btn");
  const resetButton = document.querySelector(".reset-btn");
  const nextButton = document.querySelector(".next-btn");
  const submitButton = document.querySelector(".submit-btn");
  const reviewContent = document.getElementById("reviewContent");
  const lastStepIndex = stepIndicators.length - 1;

  const workLabels = {
    formal: "CLT (carteira assinada)",
    informal: "Informal/autônomo",
    mei: "MEI",
    desempregado: "Desempregado",
    aposentado: "Aposentado/Pensionista",
    nao_trabalha: "Não trabalha atualmente",
  };

  const rendaLabels = {
    extrema: "Até R$ 218",
    pobreza: "R$ 218 a R$ 435",
    meio: "Até 1/2 salário mínimo",
    "1sm": "1/2 a 1 salário mínimo",
    "2sm": "1 a 2 salários mínimos",
    "3sm": "2 a 3 salários mínimos",
    "4sm": "3 a 4 salários mínimos",
    acima: "Acima de 4 salários mínimos",
  };

  const genderLabels = {
    feminino: "Feminino",
    masculino: "Masculino",
  };

  const maritalLabels = {
    solteiro: "Solteiro(a)",
    casado: "Casado(a)",
    uniao: "União estável",
    separado: "Separado(a)",
    viuvo: "Viúvo(a)",
  };

  const moradiaLabels = {
    propria_escritura: "Própria (com escritura)",
    propria_financiada: "Própria (financiada)",
    alugada: "Alugada",
    cedida: "Cedida por terceiros",
    ocupada: "Ocupada",
    risco: "Em área de risco/invasão",
    rua: "Em situação de rua",
  };

  const yesNoLabels = {
    sim: "Sim",
    nao: "Não",
  };

  const cadunicoLabels = {
    sim: "Sim, estou cadastrado",
    nao: "Não estou cadastrado",
    nao_sei: "Não sei",
  };

  const doencaLabels = {
    cancer: "Câncer",
    hiv: "HIV/AIDS",
    renal: "Insuficiência renal",
    cardiaca: "Doença cardíaca grave",
    respiratoria: "Doença respiratória",
    outra: "Outra condição grave",
    nenhuma: "Nenhuma das anteriores",
  };

  const tipoDeficienciaLabels = {
    fisica: "Física/motora",
    visual: "Visual",
    auditiva: "Auditiva",
    intelectual: "Intelectual",
    mental: "Transtorno mental/psiquiátrico",
    multipla: "Múltipla",
  };

  const contribuicaoLabels = {
    menos6: "Menos de 6 meses",
    "6a12": "6 meses a 1 ano",
    "1a5": "1 a 5 anos",
    "5a10": "5 a 10 anos",
    "10a15": "10 a 15 anos",
    mais15: "Mais de 15 anos",
  };

  const desempregoLabels = {
    menos6: "Menos de 6 meses",
    "6a12": "6 a 12 meses",
    mais12: "Mais de 12 meses",
  };

  const draftStorageKey = "form-daniel-wizard-draft";

  document.documentElement.style.setProperty("--steps", stepIndicators.length);

  let currentStep = 0;

  const getFieldValue = (id) => document.getElementById(id)?.value || "";

  const getCheckedValue = (name) =>
    document.querySelector(`input[name="${name}"]:checked`)?.value || "";

  const resolveValue = (value, labels) => {
    if (!value) {
      return "Não informado";
    }

    return labels[value] || value;
  };

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const createReviewItem = (label, value) => `
    <div class="review-item">
      <span class="review-label">${escapeHtml(label)}</span>
      <strong class="review-value">${escapeHtml(value)}</strong>
    </div>
  `;

  const createReviewSection = (title, items) => `
    <section class="review-section">
      <h4>${escapeHtml(title)}</h4>
      <div class="review-list">
        ${items.join("")}
      </div>
    </section>
  `;

  const collectFormData = () => ({
    fullName: getFieldValue("full-name"),
    day: getFieldValue("day"),
    month: getFieldValue("month"),
    year: getFieldValue("year"),
    cpf: getFieldValue("cpf"),
    gender: getFieldValue("gender"),
    maritalStatus: getFieldValue("maritalStatus"),
    workStatus: getFieldValue("workStatus"),
    contribuicaoTempo: getFieldValue("contribuicaoTempo"),
    tempoDesemprego: getFieldValue("tempoDesemprego"),
    recolhimentosAnteriores: getFieldValue("recolhimentosAnteriores"),
    renda: getFieldValue("renda"),
    cadunico: getCheckedValue("cadunico"),
    moradia: getFieldValue("moradia"),
    dependents: getCheckedValue("dependents"),
    qtdDependentes: getFieldValue("qtdDependentes"),
    idadesDependentes: getFieldValue("idadesDependentes"),
    cuidador: getCheckedValue("cuidador"),
    pcd: getCheckedValue("pcd"),
    tipoDeficiencia: getFieldValue("tipoDeficiencia"),
    laudo: getCheckedValue("laudo"),
    doencas: Array.from(
      document.querySelectorAll('input[name="doencas"]:checked'),
    ).map((checkbox) => checkbox.value),
  });

  const saveDraft = () => {
    try {
      localStorage.setItem(
        draftStorageKey,
        JSON.stringify({
          currentStep,
          data: collectFormData(),
        }),
      );
    } catch (error) {
      console.warn("Não foi possível salvar o rascunho do formulário.", error);
    }
  };

  const applyDraft = (data) => {
    document.getElementById("full-name").value = data.fullName || "";
    document.getElementById("day").value = data.day || "";
    document.getElementById("month").value = data.month || "";
    document.getElementById("year").value = data.year || "";
    document.getElementById("cpf").value = data.cpf || "";
    document.getElementById("gender").value = data.gender || "";
    document.getElementById("maritalStatus").value = data.maritalStatus || "";
    document.getElementById("workStatus").value = data.workStatus || "";
    document.getElementById("contribuicaoTempo").value =
      data.contribuicaoTempo || "";
    document.getElementById("tempoDesemprego").value =
      data.tempoDesemprego || "";
    document.getElementById("recolhimentosAnteriores").value =
      data.recolhimentosAnteriores || "";
    document.getElementById("renda").value = data.renda || "";
    document.getElementById("moradia").value = data.moradia || "";
    document.getElementById("qtdDependentes").value = data.qtdDependentes || "";
    document.getElementById("idadesDependentes").value =
      data.idadesDependentes || "";
    document.getElementById("tipoDeficiencia").value =
      data.tipoDeficiencia || "";

    document.querySelectorAll('input[name="cadunico"]').forEach((radio) => {
      radio.checked = radio.value === data.cadunico;
    });

    document.querySelectorAll('input[name="dependents"]').forEach((radio) => {
      radio.checked = radio.value === data.dependents;
    });

    document.querySelectorAll('input[name="cuidador"]').forEach((radio) => {
      radio.checked = radio.value === data.cuidador;
    });

    document.querySelectorAll('input[name="pcd"]').forEach((radio) => {
      radio.checked = radio.value === data.pcd;
    });

    document.querySelectorAll('input[name="laudo"]').forEach((radio) => {
      radio.checked = radio.value === data.laudo;
    });

    document.querySelectorAll('input[name="doencas"]').forEach((checkbox) => {
      checkbox.checked = Array.isArray(data.doencas)
        ? data.doencas.includes(checkbox.value)
        : false;
    });

    toggleDependentes(data.dependents === "sim");
    togglePCD(data.pcd === "sim");

    const workStatusEvent = new Event("change", { bubbles: true });
    document.getElementById("workStatus").dispatchEvent(workStatusEvent);

    if (data.dependents !== "sim") {
      document.getElementById("qtdDependentes").value = "";
      document.getElementById("idadesDependentes").value = "";
    }

    if (data.pcd !== "sim") {
      document.getElementById("tipoDeficiencia").value = "";
      document.querySelectorAll('input[name="laudo"]').forEach((radio) => {
        radio.checked = false;
      });
    }

    if (Array.isArray(data.doencas) && data.doencas.includes("nenhuma")) {
      document
        .querySelectorAll('input[name="doencas"]:not([value="nenhuma"])')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    }
  };

  const restoreDraft = () => {
    try {
      const storedDraft = localStorage.getItem(draftStorageKey);

      if (!storedDraft) {
        return;
      }

      const parsedDraft = JSON.parse(storedDraft);

      if (parsedDraft?.data) {
        applyDraft(parsedDraft.data);
      }

      if (Number.isInteger(parsedDraft?.currentStep)) {
        currentStep = Math.max(
          0,
          Math.min(parsedDraft.currentStep, lastStepIndex),
        );
      }
    } catch (error) {
      console.warn(
        "Não foi possível restaurar o rascunho do formulário.",
        error,
      );
    }
  };

  const generateReview = () => {
    if (!reviewContent) {
      return;
    }

    const data = collectFormData();
    const sections = [];

    sections.push(
      createReviewSection("Dados pessoais", [
        createReviewItem("Nome completo", data.fullName || "Não informado"),
        createReviewItem(
          "Data de nascimento",
          data.day && data.month && data.year
            ? `${data.day}/${data.month}/${data.year}`
            : "Não informado",
        ),
        createReviewItem("CPF", data.cpf || "Não informado"),
        createReviewItem("Sexo", resolveValue(data.gender, genderLabels)),
        createReviewItem(
          "Estado civil",
          resolveValue(data.maritalStatus, maritalLabels),
        ),
      ]),
    );

    const workItems = [
      createReviewItem(
        "Situação de trabalho",
        resolveValue(data.workStatus, workLabels),
      ),
    ];

    if (["formal", "mei"].includes(data.workStatus)) {
      workItems.push(
        createReviewItem(
          "Tempo de contribuição ao INSS",
          resolveValue(data.contribuicaoTempo, contribuicaoLabels),
        ),
      );
    }

    if (data.workStatus === "desempregado") {
      workItems.push(
        createReviewItem(
          "Tempo desempregado",
          resolveValue(data.tempoDesemprego, desempregoLabels),
        ),
      );
      workItems.push(
        createReviewItem(
          "Teve carteira assinada nos últimos 36 meses",
          resolveValue(data.recolhimentosAnteriores, yesNoLabels),
        ),
      );
    }

    workItems.push(
      createReviewItem(
        "Renda per capita",
        resolveValue(data.renda, rendaLabels),
      ),
    );
    workItems.push(
      createReviewItem("CadÚnico", resolveValue(data.cadunico, cadunicoLabels)),
    );

    sections.push(createReviewSection("Trabalho e renda", workItems));

    const familyItems = [
      createReviewItem("Moradia", resolveValue(data.moradia, moradiaLabels)),
      createReviewItem(
        "Dependentes",
        data.dependents === "sim"
          ? `Sim${data.qtdDependentes ? ` (${data.qtdDependentes})` : ""}`
          : data.dependents === "nao"
            ? "Não"
            : "Não informado",
      ),
    ];

    if (data.dependents === "sim") {
      familyItems.push(
        createReviewItem(
          "Idades dos dependentes",
          data.idadesDependentes || "Não informado",
        ),
      );
    }

    familyItems.push(
      createReviewItem("É cuidador", resolveValue(data.cuidador, yesNoLabels)),
    );

    sections.push(createReviewSection("Família e moradia", familyItems));

    const healthItems = [
      createReviewItem(
        "Pessoa com deficiência (PCD)",
        resolveValue(data.pcd, yesNoLabels),
      ),
    ];

    if (data.pcd === "sim") {
      healthItems.push(
        createReviewItem(
          "Tipo de deficiência",
          resolveValue(data.tipoDeficiencia, tipoDeficienciaLabels),
        ),
      );
      healthItems.push(
        createReviewItem(
          "Laudo médico atualizado",
          resolveValue(data.laudo, {
            sim: "Atualizado",
            nao: "Não atualizado",
          }),
        ),
      );
    }

    const doencasSelecionadas = data.doencas.includes("nenhuma")
      ? ["Nenhuma das anteriores"]
      : data.doencas.map((doenca) => doencaLabels[doenca] || doenca);

    healthItems.push(
      createReviewItem(
        "Condições crônicas ou graves",
        doencasSelecionadas.length > 0
          ? doencasSelecionadas.join(", ")
          : "Não informado",
      ),
    );

    sections.push(
      createReviewSection("Saúde e condições especiais", healthItems),
    );

    reviewContent.innerHTML = sections.join("");
  };

  const updateStepHeight = () => {
    stepsContainer.style.height = steps[currentStep].offsetHeight + "px";
  };

  const updateButtons = () => {
    prevButton.hidden = currentStep === 0;
    resetButton.hidden = currentStep < lastStepIndex;
    nextButton.hidden = currentStep >= lastStepIndex;
    submitButton.hidden = !nextButton.hidden;
  };

  const updateProgress = (persist = true) => {
    const width = lastStepIndex === 0 ? 1 : currentStep / lastStepIndex;

    progress.style.transform = `scaleX(${width})`;

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

    if (currentStep === lastStepIndex) {
      generateReview();
    }

    updateStepHeight();

    if (persist) {
      saveDraft();
    }
  };

  const resetForm = () => {
    form.reset();
    currentStep = 0;

    try {
      localStorage.removeItem(draftStorageKey);
    } catch (error) {
      console.warn("Não foi possível limpar o rascunho do formulário.", error);
    }

    toggleDependentes(false);
    togglePCD(false);
    document.getElementById("contribuicaoBox").classList.remove("visible");
    document.getElementById("desempregoBox").classList.remove("visible");
    document.getElementById("reviewContent").innerHTML = "";
    document
      .getElementById("workStatus")
      .dispatchEvent(new Event("change", { bubbles: true }));

    updateProgress(false);
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

    if (currentStep < lastStepIndex) {
      currentStep++;
      updateProgress();
    }
  });

  resetButton.addEventListener("click", (e) => {
    e.preventDefault();

    const shouldReset = window.confirm(
      "Tem certeza que deseja apagar todas as informações e recomeçar?",
    );

    if (!shouldReset) {
      return;
    }

    resetForm();
  });

  form.addEventListener("input", () => {
    if (currentStep === lastStepIndex) {
      generateReview();
    }

    saveDraft();
  });

  form.addEventListener("change", (event) => {
    if (event.target?.name === "pcd") {
      const isYes = event.target.value === "sim" && event.target.checked;
      togglePCD(isYes);
    }

    if (currentStep === lastStepIndex) {
      generateReview();
    }

    saveDraft();
  });

  document.querySelectorAll('input[name="doencas"]').forEach((checkbox) => {
    checkbox.addEventListener("change", () => {
      if (checkbox.value === "nenhuma" && checkbox.checked) {
        document
          .querySelectorAll('input[name="doencas"]:not([value="nenhuma"])')
          .forEach((otherCheckbox) => {
            otherCheckbox.checked = false;
          });
      }

      if (checkbox.value !== "nenhuma" && checkbox.checked) {
        const noneCheckbox = document.querySelector(
          'input[name="doencas"][value="nenhuma"]',
        );

        if (noneCheckbox) {
          noneCheckbox.checked = false;
        }
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (currentStep < lastStepIndex) {
      currentStep = lastStepIndex;
      updateProgress();
      return;
    }

    generateReview();
    saveDraft();
    window.location.href = "../../beneficios-recomendados.html";
  });

  restoreDraft();
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
    pcdStep.classList.contains("current") && pcdYes.checked,
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

function toggleOutrasDoencas(checkbox) {
  if (checkbox.checked) {
    document
      .querySelectorAll('input[name="doencas"]:not([value="nenhuma"])')
      .forEach((cb) => (cb.checked = false));
  }
}
