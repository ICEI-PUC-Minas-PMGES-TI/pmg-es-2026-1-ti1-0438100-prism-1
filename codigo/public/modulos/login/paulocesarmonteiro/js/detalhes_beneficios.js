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
  } else {
    document.getElementById("nome-beneficio-mobile").textContent = "Benefício não encontrado";
    document.getElementById("nome-beneficio-desktop").textContent = "Benefício não encontrado";
  }

}

window.onload = carregarDados;