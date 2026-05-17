/*Recebe uma lista com os filtros de categoria e publicoAlvo*/
async function carregarBeneficios(filtro = {}) {
    const resposta = await fetch('/codigo/db/db.json');
    const dados = await resposta.json();
    let beneficios = dados.beneficios;

    if (filtro.categoria) {
        beneficios = beneficios.filter(b => b.categoria === filtro.categoria);
    }

    if (filtro.publicoAlvo) {
        beneficios = beneficios.filter(b =>
            filtro.publicoAlvo.some(perfil => b.publicoAlvo.includes(perfil))
        );
    }

    renderizarCards(beneficios);
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