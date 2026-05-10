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
    intro.textContent = `Encontramos ${beneficios.length} benefícios com base no seu perfil. Clique em cada um para saber mais sobre como solicitar.`;

    beneficios.forEach(beneficio => {
        const card = document.createElement('div');
        card.classList.add('card-beneficio');
        card.innerHTML = `
            <h2>${beneficio.nome}</h2>
            <p>${beneficio.descricao}</p>
            <span class="categoria">${beneficio.categoria}</span>
            ${beneficio.valorBase ? `<p class="valor">R$ ${beneficio.valorBase.toFixed(2)}</p>` : ''}
            <p class="orgao">${beneficio.orgaoResponsavel}</p>
            <button class="botao-azul">Acessar Benefício</button>
        `;
        container.appendChild(card);
    });
}

carregarBeneficios();