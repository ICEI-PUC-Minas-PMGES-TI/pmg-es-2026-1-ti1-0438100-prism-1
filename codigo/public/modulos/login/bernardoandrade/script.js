const botao_menu = document.querySelector('.botao-menu');
const nav = document.querySelector('nav');
const header = document.querySelector('header');

botao_menu.addEventListener('click', () => {
    nav.classList.toggle('menu-aberto');
    header.classList.toggle('menu-aberto');
});

const beneficios = [
    {
        id: 1,
        nome: "Bolsa Família",
        orgao: "Governo Federal",
        descricao: "Auxílio para famílias de baixa renda cadastradas em programas sociais.",
        categoria: "Alimentação",
        valor: 142
    },

    {
        id: 2,
        nome: "Auxílio Gás",
        orgao: "Governo Federal",
        descricao: "Benefício para ajudar na compra do gás de cozinha.",
        categoria: "Energia",
        valor: 102
    },

    {
        id: 3,
        nome: "INSS",
        orgao: "INSS",
        descricao: "Benefícios para aposentadoria e auxílio-doença.",
        categoria: "Previdência",
        valor: 0
    },

    {
        id: 4,
        nome: "Minha Casa Minha Vida",
        orgao: "Governo Federal",
        descricao: "Programa de acesso à moradia para famílias de baixa renda.",
        categoria: "Habitação",
        valor: 500
    },

    {
        id: 5,
        nome: "Tarifa Social de Energia",
        orgao: "ANEEL",
        descricao: "Desconto na conta de energia elétrica para famílias de baixa renda.",
        categoria: "Energia",
        valor: 65
    },

    {
        id: 6,
        nome: "Auxílio Brasil Educação",
        orgao: "Governo Federal",
        descricao: "Incentivo financeiro para permanência de estudantes na escola.",
        categoria: "Educação",
        valor: 200
    },

    {
        id: 7,
        nome: "Passe Livre Estudantil",
        orgao: "Prefeitura",
        descricao: "Benefício de transporte gratuito para estudantes.",
        categoria: "Transporte",
        valor: 150
    },

    {
        id: 8,
        nome: "Farmácia Popular",
        orgao: "Ministério da Saúde",
        descricao: "Medicamentos gratuitos ou com desconto.",
        categoria: "Saúde",
        valor: 80
    }
];

const container = document.getElementById('beneficios');
const pesquisa = document.getElementById('pesquisa');
const filtroCategoria = document.getElementById('filtro-categoria');
const ordenacao = document.getElementById('ordenacao');
const contador = document.getElementById('contador-beneficios');
const limparFiltros = document.getElementById('limpar-filtros');

function atualizarContador(quantidade) {
    contador.textContent = `${quantidade} benefício(s) encontrado(s)`;
}

function criarCard(beneficio) {

    const card = document.createElement('div');

    card.classList.add('card-beneficio');

    card.innerHTML = `
        <div class="card-header">
            <h2>${beneficio.nome}</h2>
            <span class="orgao">${beneficio.orgao}</span>
        </div>

        <p class="descricao">
            ${beneficio.descricao}
        </p>

        <div class="card-footer">
            <span class="categoria">${beneficio.categoria}</span>

            <span class="valor">
                ${beneficio.valor > 0 ? `R$ ${beneficio.valor},00` : 'Variável'}
            </span>
        </div>

        <button class="botao-azul botao-detalhes">
            Mais Detalhes
        </button>
    `;

    const botaoDetalhes = card.querySelector('.botao-detalhes');

    botaoDetalhes.addEventListener('click', () => {
        window.location.href = `detalhes.html?id=${beneficio.id}`;
    });

    return card;
}

function mostrarBeneficios(lista) {

    container.innerHTML = '';

    atualizarContador(lista.length);

    if (lista.length === 0) {

        container.innerHTML = `
            <p class="sem-resultados">
                Nenhum benefício encontrado.
            </p>
        `;

        return;
    }

    lista.forEach(beneficio => {

        const card = criarCard(beneficio);

        container.appendChild(card);
    });
}

function filtrarBeneficios() {

    let filtrados = [...beneficios];

    const textoPesquisa = pesquisa.value.toLowerCase();

    filtrados = filtrados.filter(beneficio =>
        beneficio.nome.toLowerCase().includes(textoPesquisa)
    );

    const categoriaSelecionada = filtroCategoria.value;

    if (categoriaSelecionada !== '') {

        filtrados = filtrados.filter(beneficio =>
            beneficio.categoria === categoriaSelecionada
        );
    }

    if (ordenacao.value === 'maior') {
        filtrados.sort((a, b) => b.valor - a.valor);
    }

    if (ordenacao.value === 'menor') {
        filtrados.sort((a, b) => a.valor - b.valor);
    }

    mostrarBeneficios(filtrados);
}

function resetarFiltros() {

    pesquisa.value = '';
    filtroCategoria.value = '';
    ordenacao.value = '';

    mostrarBeneficios(beneficios);
}

pesquisa.addEventListener('input', filtrarBeneficios);

filtroCategoria.addEventListener('change', filtrarBeneficios);

ordenacao.addEventListener('change', filtrarBeneficios);

limparFiltros.addEventListener('click', resetarFiltros);

window.addEventListener('load', () => {
    mostrarBeneficios(beneficios);
});