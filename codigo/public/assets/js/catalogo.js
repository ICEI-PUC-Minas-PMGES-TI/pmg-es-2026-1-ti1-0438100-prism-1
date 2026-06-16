const botao_menu = document.querySelector('.botao-menu');
const nav = document.querySelector('nav');
const header = document.querySelector('header');

botao_menu.addEventListener('click', () => {
    nav.classList.toggle('menu-aberto');
    header.classList.toggle('menu-aberto');
});

let beneficios = [];

const container = document.getElementById('beneficios');
const pesquisa = document.getElementById('pesquisa');
const filtroCategoria = document.getElementById('filtro-categoria');
const ordenacao = document.getElementById('ordenacao');
const contador = document.getElementById('contador-beneficios');
const limparFiltros = document.getElementById('limpar-filtros');
const contadorFavoritos = document.getElementById('contador-favoritos');
const mostrarFavoritosBtn = document.getElementById('mostrar-favoritos');

let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let exibindoFavoritos = false;

async function carregarBeneficios() {
    try {
        const resposta = await fetch(
            'http://localhost:3000/beneficios'
        );

        beneficios = await resposta.json();

        mostrarBeneficios(beneficios);

    } catch (erro) {

        console.error(
            'Erro ao carregar benefícios:',
            erro
        );

        container.innerHTML = `
            <p class="sem-resultados">
                Erro ao carregar benefícios.
            </p>
        `;
    }
}

function atualizarContador(quantidade) {
    contador.textContent =
        `${quantidade} benefício(s) encontrado(s)`;
}

function atualizarFavoritos() {
    localStorage.setItem(
        'favoritos',
        JSON.stringify(favoritos)
    );

    contadorFavoritos.textContent =
        `Favoritos: ${favoritos.length}`;
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
            <span class="categoria">
                ${beneficio.categoria}
            </span>

            <span class="valor">
                ${
                    beneficio.valor > 0
                    ? `R$ ${beneficio.valor},00`
                    : 'Variável'
                }
            </span>
        </div>

        <button class="favoritar">
            ${
                favoritos.includes(beneficio.id)
                ? '★ Favoritado'
                : '☆ Favoritar'
            }
        </button>

        <button class="botao-azul botao-detalhes">
            Mais Detalhes
        </button>
    `;

    const botaoFavorito =
        card.querySelector('.favoritar');

    botaoFavorito.addEventListener('click', () => {

        if (favoritos.includes(beneficio.id)) {

            favoritos =
                favoritos.filter(
                    id => id !== beneficio.id
                );

        } else {

            favoritos.push(
                beneficio.id
            );

        }

        atualizarFavoritos();

        filtrarBeneficios();
    });

    const botaoDetalhes =
        card.querySelector('.botao-detalhes');

    botaoDetalhes.addEventListener('click', () => {

        window.location.href =
            `detalhes.html?id=${beneficio.id}`;

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

        const card =
            criarCard(beneficio);

        container.appendChild(card);

    });
}

function filtrarBeneficios() {

    let filtrados = [...beneficios];

    const textoPesquisa =
        pesquisa.value.toLowerCase();

    filtrados = filtrados.filter(
        beneficio =>
            beneficio.nome
                .toLowerCase()
                .includes(textoPesquisa)
    );

    const categoriaSelecionada =
        filtroCategoria.value;

    if (categoriaSelecionada !== '') {

        filtrados = filtrados.filter(
            beneficio =>
                beneficio.categoria ===
                categoriaSelecionada
        );
    }

    if (ordenacao.value === 'maior') {

        filtrados.sort(
            (a, b) => b.valor - a.valor
        );
    }

    if (ordenacao.value === 'menor') {

        filtrados.sort(
            (a, b) => a.valor - b.valor
        );
    }

    if (exibindoFavoritos) {

        filtrados = filtrados.filter(
            beneficio =>
                favoritos.includes(
                    beneficio.id
                )
        );
    }

    mostrarBeneficios(filtrados);
}

function resetarFiltros() {

    pesquisa.value = '';

    filtroCategoria.value = '';

    ordenacao.value = '';

    exibindoFavoritos = false;

    mostrarFavoritosBtn.textContent =
        'Mostrar Favoritos';

    mostrarBeneficios(beneficios);
}

pesquisa.addEventListener(
    'input',
    filtrarBeneficios
);

filtroCategoria.addEventListener(
    'change',
    filtrarBeneficios
);

ordenacao.addEventListener(
    'change',
    filtrarBeneficios
);

limparFiltros.addEventListener(
    'click',
    resetarFiltros
);

mostrarFavoritosBtn.addEventListener(
    'click',
    () => {

        exibindoFavoritos =
            !exibindoFavoritos;

        mostrarFavoritosBtn.textContent =
            exibindoFavoritos
                ? 'Mostrar Todos'
                : 'Mostrar Favoritos';

        filtrarBeneficios();
    }
);

window.addEventListener(
    'load',
    () => {

        atualizarFavoritos();

        carregarBeneficios();

    }
);