// Simula JSON
const dados = {
  "beneficios": [
    {
      "id": "BEN-001",
      "nome": "Bolsa Família",
      "categoria": "alimentacao",
      "descricao": "O Bolsa Família é o principal programa de transferência de renda do Governo Federal brasileiro, destinado a famílias em situação de pobreza e extrema pobreza. O programa visa garantir segurança alimentar, nutricional e cidadania, unindo o apoio financeiro a ações complementares nas áreas de saúde e educação",
      "requisitos": [
        "A soma de todos os rendimentos da casa, dividida pelo número de moradores, não deve passar de R$ 218.",
        "É obrigatório estar inscrito no Cadastro Único para Programas Sociais do Governo Federal.",
        "O cadastro deve estar atualizado (no máximo a cada 2 anos) no CRAS (Centro de Referência de Assistência Social)."
      ],
      "condicoes": [
        "Frequência escolar mínima para crianças e adolescentes (4 a 17 anos). ",
        "Acompanhamento do pré-natal para gestantes; acompanhamento nutricional (peso e altura) das crianças menores de 7 anos; cumprimento do calendário nacional de vacinação."
      ],
      "documentos": [
        "CPF", "Documento de Identificação com foto", "Titulo de eleitor", "Comprovante de residência", "Certidão de Casamento", "Certidão de nascimento (Menores de idade que não possuem RG)", "Carteira de Trabalho (Maiores de idade)"
      ],
      "valorBase": 142.00,
      "dataInicio": "2025-01-01",
      "dataFim": "2025-12-31",
      "prazoInscricao": null,
      "publicoAlvo": [
        "BAIXA_RENDA"
      ],
      "orgaoResponsavel": "Governo Federal"
    }
 ]
};

// Função que pega o ID da URL
function obterIdUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Função que busca o benefício
function buscarBeneficioPorId(id) {
    return dados.beneficios.find(b => b.id === id);
}

function preencherLista(idElemento, lista) {
  const ul = document.getElementById(idElemento);

  ul.innerHTML = "";

  lista.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
}
 
/**
 *
 * @param {string} idLista     - ID do <ul> onde os checkboxes serão inseridos
 * @param {string} idBarra     - ID do <div> da barra de progresso
 * @param {string} idTexto     - ID do <span> com o texto "X de Y documentos"
 * @param {string[]} documentos - Array de strings com os nomes dos documentos
 * @param {string} prefixo     - Prefixo único para os IDs dos checkboxes (evita colisão mobile/desktop)
 */

// Função que preenche o checklist
function preencherChecklist(idLista, idBarra, idTexto, documentos, prefixo) {
  const ul = document.getElementById(idLista);
  ul.innerHTML = "";
 
  documentos.forEach((doc, index) => {
    const li = document.createElement("li");
    li.classList.add("mb-2");
 
    const checkId = `${prefixo}-doc-${index}`;
 
    li.innerHTML = `
      <div class="form-check">
        <input
          class="form-check-input checklist-item"
          type="checkbox"
          id="${checkId}"
          data-lista="${idLista}"
          data-barra="${idBarra}"
          data-texto="${idTexto}"
        >
        <label class="form-check-label" for="${checkId}">
          ${doc}
        </label>
      </div>
    `;
 
    ul.appendChild(li);
  });
 
  atualizarProgresso(idLista, idBarra, idTexto, documentos.length);
 
  
  ul.querySelectorAll(".checklist-item").forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      atualizarProgresso(idLista, idBarra, idTexto, documentos.length);
    });
  });
}
 
// Funçào que atualiza barra de progresso
function atualizarProgresso(idLista, idBarra, idTexto, total) {
  const ul = document.getElementById(idLista);
  const marcados = ul.querySelectorAll(".checklist-item:checked").length;
  const porcentagem = total > 0 ? Math.round((marcados / total) * 100) : 0;
 
  const barra = document.getElementById(idBarra);
  barra.style.width = `${porcentagem}%`;
  barra.setAttribute("aria-valuenow", porcentagem);
  barra.textContent = `${porcentagem}%`;
 
  barra.classList.remove("bg-danger", "bg-warning", "bg-success");
  if (porcentagem === 100) {
    barra.classList.add("bg-success");
  } else if (porcentagem >= 50) {
    barra.classList.add("bg-warning");
  } else {
    barra.classList.add("bg-danger");
  }
 
  document.getElementById(idTexto).textContent = `${marcados} de ${total} documentos`;
}

// Funcão que carrega os dados na tela
function carregarDados() {
  const id = "BEN-001";
  const beneficio = buscarBeneficioPorId(id);

  if (beneficio) {
    document.getElementById("nome-beneficio-mobile").textContent = beneficio.nome;
    document.getElementById("nome-beneficio-desktop").textContent = beneficio.nome;

    document.getElementById("descricao-beneficio-mobile").textContent = beneficio.descricao;
    document.getElementById("descricao-beneficio-desktop").textContent = beneficio.descricao;

    document.getElementById("valor-beneficio-mobile").textContent = "R$ " + beneficio.valorBase.toFixed(2);
    document.getElementById("valor-beneficio-desktop").textContent = "R$ " + beneficio.valorBase.toFixed(2);

    preencherLista("requisitos-beneficio-mobile", beneficio.requisitos);
    preencherLista("requisitos-beneficio-desktop", beneficio.requisitos);

    preencherLista("condicoes-beneficio-mobile", beneficio.condicoes);
    preencherLista("condicoes-beneficio-desktop", beneficio.condicoes);

    preencherChecklist(
      "documentos-checklist-mobile",   
      "barra-progresso-mobile",        
      "progresso-texto-mobile",       
      beneficio.documentos,
      "mobile"                         
    );
 
    preencherChecklist(
      "documentos-checklist-desktop",  
      "barra-progresso-desktop",       
      "progresso-texto-desktop",       
      beneficio.documentos,
      "desktop"                        
    );
  } else {
    document.getElementById("nome-beneficio-mobile").textContent = "Benefício não encontrado";
    document.getElementById("nome-beneficio-desktop").textContent = "Benefício não encontrado";
  }

}

window.onload = carregarDados;