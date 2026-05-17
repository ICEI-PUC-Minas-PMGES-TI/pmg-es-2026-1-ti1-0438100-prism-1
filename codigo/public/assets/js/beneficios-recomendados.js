/*Recebe uma lista com os filtros de categoria e publicoAlvo*/
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

        renderizarCards(beneficiosFiltrados);
    } catch (erro) {
        console.error("Erro ao carregar os benefícios do servidor:", erro);
    }
}

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
            <a href="${linkDestino}" class="botao-azul">Acessar Benefício</a>
        `;
        container.appendChild(card);
    });
}

carregarBeneficios();