// ==========================================
// 1. VARIÁVEIS GLOBAIS
// ==========================================
// Simulação da Assistente logada
const API_URL = 'http://localhost:3000'
const usuarioLogado = protegerPagina();
const idAssistenteLogada = usuarioLogado?.id;
let familiasDaAssistente = [];
let nomeAssistenteLogada = "";

// ==========================================
// 2. SELEÇÃO DE ELEMENTOS DO DOM
// ==========================================
const inputPesquisa = document.getElementById('pesquisa-familia');
const containerFamilias = document.getElementById('container-familias');
const introTexto = document.querySelector('.intro p');

// ==========================================
// 3. RENDERIZAÇÃO
// ==========================================
function renderizarFamilias(lista) {
    containerFamilias.innerHTML = '';

    introTexto.innerHTML = `Você tem <strong>${lista.length}</strong> famílias sob sua responsabilidade. Clique para ver detalhes.`;

    lista.forEach(familia => {
        const card = document.createElement('div');

        card.classList.add('card-beneficio');

        const responsavel = familia.membros[0]?.nome || "Não informado";

        card.innerHTML = `
            <div style="width: 100%; height: 180px; border-radius: 30px; overflow: hidden; margin-bottom: 15px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <img 
                    src="${familia.fotoFamilia}" 
                    alt="Foto da ${familia.nomeFamilia}" 
                    style="width: 100%; height: 100%; object-fit: cover;"
                    onerror="this.src='https://placehold.co/400x200?text=Sem+Foto'"
                >
            </div>

            <div class="card-header">
                <h2>${familia.nomeFamilia}</h2>
                <span class="orgao">${familia.membros.length} Membros</span>
            </div>
            
            <p class="descricao" style="margin-top: 10px;">
                <strong>Responsável:</strong> ${responsavel}<br>
                <strong>Contato:</strong> ${familia.telefone}<br>
                <strong>Renda total:</strong> R$ ${familia.rendaFamiliar.toFixed(2)}
            </p>
            
            <div class="card-footer" style="margin-top: 15px;">
                <span class="categoria">${familia.endereco.bairro}, ${familia.endereco.cidade} - ${familia.endereco.estado}</span>
            </div>
            
            <div style="display: flex; gap: 10px; margin-top: 15px; flex-wrap: wrap;">
                <a href="detalhes-familia.html?id=${familia.idFamilia}" class="botao-azul" style="flex: 1; min-width: 100px; text-align: center;">Acessar</a>
                <a href="editar-familia.html?id=${familia.id}" class="botao-amarelo btn-editar-familia" style="flex: 1; min-width: 100px; text-align: center; color: white;">Editar</a>
                <a class="btn-excluir-familia botao-azul" style="flex: 1; min-width: 100px; text-align: center; background-color: red; cursor: pointer;">Excluir</a>
            </div>
        `;

        const btnExcluir = card.querySelector('.btn-excluir-familia');
        btnExcluir.addEventListener('click', () => {
            excluirFamilia(familia.id, familia.nomeFamilia);
        });

        containerFamilias.appendChild(card);
    });
}

// ==========================================
// 4. LÓGICA DE FILTRAGEM
// ==========================================
function filtrarPorNome() {
    const textoPesquisa = inputPesquisa.value.toLowerCase();

    const filtradas = familiasDaAssistente.filter(familia =>
        familia.nomeFamilia.toLowerCase().includes(textoPesquisa) ||
        familia.endereco.bairro.toLowerCase().includes(textoPesquisa) ||
        familia.endereco.cidade.toLowerCase().includes(textoPesquisa)
    );

    renderizarFamilias(filtradas);
}

// ==========================================
// 5. EXCLUSÃO DE FAMÍLIA
// ==========================================
async function excluirFamilia(id, nome) {
    const confirmar = confirm(`Tem certeza que deseja excluir a família "${nome}"?\n\nEsta ação não pode ser desfeita.`);
 
    if (!confirmar) return;
 
    try {
        const resposta = await fetch(`${API_URL}/familias/${id}`, {
            method: 'DELETE'
        });
 
        if (!resposta.ok) throw new Error('Falha ao excluir a família.');
 
        familiasDaAssistente = familiasDaAssistente.filter(familia => familia.id !== id);
        filtrarPorNome();
 
        alert('Família excluída com sucesso.');
 
    } catch (erro) {
        console.error('Erro ao excluir família:', erro);
        alert('Erro ao excluir a família. Verifique a conexão com o servidor e tente novamente.');
    }
}
 

// ==========================================
// 6. CONSUMO DA API E INICIALIZAÇÃO
// ==========================================
async function inicializar() {
    const usuarioLogado = protegerPagina();

    if (!usuarioLogado) return;

    const idAssistenteLogada = usuarioLogado?.id;

    try {
        // 1. Busca os dados da Assistente Social Logada
        const FamiliasBanco = await fetch('http://localhost:3000/familias');
        const Familias = await FamiliasBanco.json();

        familiasDaAssistente = Familias.filter(
            familia => familia.assistenteSocial.idAssistente === idAssistenteLogada
        );

        renderizarFamilias(familiasDaAssistente);

    } catch (erro) {
        console.error("Erro ao buscar dados da API:", erro);
    }
}

inputPesquisa.addEventListener('input', filtrarPorNome);
window.addEventListener('load', inicializar);