// ==========================================
// 1. VARIÁVEIS GLOBAIS E DE ESTADO
// ==========================================
let beneficiosRecomendados = [];
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
let exibindoFavoritos = false;

// ==========================================
// 2. SELEÇÃO DE ELEMENTOS DO DOM
// ==========================================
const filtroCategoria = document.getElementById('filtro-categoria');
const ordenacao = document.getElementById('ordenacao');
const contador = document.getElementById('contador-beneficios');
const limparFiltros = document.getElementById('limpar-filtros');
const contadorFavoritos = document.getElementById('contador-favoritos');
const mostrarFavoritosBtn = document.getElementById('mostrar-favoritos');

// ==========================================
// 3. FUNÇÕES DE DADOS E API
// ==========================================
/*Recebe uma lista com os filtros de categoria e publicoAlvo*/
/*OBS: Novos Filtros serão adicionados após a escolha das informações coletadas do usuário.*/
async function carregarBeneficios(filtro = {}) {
    try {
        const resposta = await fetch('http://localhost:3000/beneficios');
        const beneficios = await resposta.json();

        let beneficiosFiltrados = beneficios;

        if (filtro.categoria) {
            beneficiosFiltrados = beneficiosFiltrados.filter(b => b.categoria === filtro.categoria);
        }

        if (filtro.publicoAlvo) {
            beneficiosFiltrados = beneficiosFiltrados.filter(b =>
                filtro.publicoAlvo.some(perfil => b.publicoAlvo.includes(perfil))
            );
        }

        return beneficiosFiltrados;
    } catch (erro) {
        console.error("Erro ao carregar os benefícios do servidor:", erro);
    }
}

function atualizarFavoritos() {
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    contadorFavoritos.textContent = `Favoritos: ${favoritos.length}`;
}

// ==========================================
// 4. FUNÇÕES DE RENDERIZAÇÃO E INTERFACE
// ==========================================
function renderizarCards(beneficios) {
    const container = document.querySelector('.beneficios');
    container.innerHTML = '';

    const intro = document.querySelector('.intro p');
    intro.innerHTML = `Encontramos <strong>${beneficios.length} benefícios</strong> com base no seu perfil. Clique em cada um para saber mais sobre como solicitar.`;

    beneficios.forEach(beneficio => {
        const linkDestino = `pagina-do-beneficio.html?id=${beneficio.id}`;
        const card = document.createElement('div');
        card.classList.add('card-beneficio');
        card.innerHTML = `
            <div class="card-header">
                <h2>${beneficio.nome}</h2>
                <span class="orgao">${beneficio.orgaoResponsavel}</span>
            </div>
            <p class="descricao">${beneficio.descricao}</p>
            <div class="card-footer">
            <span class="categoria">${beneficio.categoria}</span>
            ${beneficio.valorBase ? `<p class="valor">Valor Base: R$ ${beneficio.valorBase.toFixed(2)}</p>` : ''}
            </div>
            <div class=favoritar>
            <button>
            ${favoritos.includes(beneficio.id)
                ? '<img width="20" height="20" src="https://img.icons8.com/ios-filled/50/like--v1.png" alt="like--v1"/> Favoritado'
                : '<img width="20" height="20" src="https://img.icons8.com/ios/50/like--v1.png" alt="like"/> Favoritar'}
        </button>
        </div>
            <a href="${linkDestino}" class="botao-azul">Mais Detalhes</a>
        `;
        container.appendChild(card);
        const botaoFavorito = card.querySelector('.favoritar');

        botaoFavorito.addEventListener('click', () => {
            if (favoritos.includes(beneficio.id)) {
                favoritos = favoritos.filter(id => id !== beneficio.id);
            } else {
                favoritos.push(beneficio.id);
            }

            atualizarFavoritos();
            filtrarBeneficios();
        });
    });
}

// ==========================================
// 5. FUNÇÕES DE LÓGICA E REGRAS DE NEGÓCIO
// ==========================================
function filtrarBeneficios() {
    let filtrados = beneficiosRecomendados;

    const textoPesquisa = pesquisa.value.toLowerCase();

    filtrados = filtrados.filter(beneficio =>
        beneficio.nome.toLowerCase().includes(textoPesquisa)
    );

    const categoriaSelecionada = filtroCategoria.value;

    if (categoriaSelecionada !== '') {
        filtrados = filtrados.filter(
            beneficio => beneficio.categoria === categoriaSelecionada
        );
    }

    if (ordenacao.value === 'maior') {
        filtrados.sort((a, b) => b.valorBase - a.valorBase);
    }

    if (ordenacao.value === 'menor') {
        filtrados.sort((a, b) => a.valorBase - b.valorBase);
    }

    if (exibindoFavoritos) {
        filtrados = filtrados.filter(
            beneficio => favoritos.includes(beneficio.id)
        );
    }

    renderizarCards(filtrados);
}

function resetarFiltros() {
    pesquisa.value = '';
    filtroCategoria.value = '';
    ordenacao.value = '';

    renderizarCards(beneficiosRecomendados);
}

// ==========================================
// 6. INICIALIZAÇÃO E EVENT LISTENERS
// ==========================================
async function inicializar() {
    beneficiosRecomendados = await carregarBeneficios();
    renderizarCards(beneficiosRecomendados);
    atualizarFavoritos();
}

pesquisa.addEventListener('input', filtrarBeneficios);
filtroCategoria.addEventListener('change', filtrarBeneficios);
ordenacao.addEventListener('change', filtrarBeneficios);
limparFiltros.addEventListener('click', resetarFiltros);

mostrarFavoritosBtn.addEventListener('click', () => {
    exibindoFavoritos = !exibindoFavoritos;

    mostrarFavoritosBtn.textContent =
        exibindoFavoritos
            ? 'Mostrar Todos'
            : 'Mostrar Favoritos';

    filtrarBeneficios();
});

window.addEventListener('load', () => {
    inicializar();
});