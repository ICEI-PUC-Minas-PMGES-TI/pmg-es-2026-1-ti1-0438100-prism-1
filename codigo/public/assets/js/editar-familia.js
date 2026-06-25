// ===================================================
// CONFIGURAÇÕES GLOBAIS E SELEÇÃO DE ELEMENTOS
// ===================================================
const API_URL = 'http://localhost:3000';
let listaDeBeneficiosDisponiveis = [];

const formEditar = document.getElementById('form-edicao');
const containerBeneficiosFamilia = document.getElementById('container-beneficios-familia');
const containerMembros = document.getElementById('container-membros');

const btnAddBeneficioFamilia = document.getElementById('btn-add-beneficio-familia');
const btnAddMembro = document.getElementById('btn-add-membro');

const urlParams = new URLSearchParams(window.location.search);
const idFamilia = urlParams.get('id');

if (!idFamilia) {
    alert('Família não identificada.');
    window.location.href = 'familias.html';
}

// ===================================================
// INICIALIZAÇÃO E CARREGAMENTO DE DADOS
// ===================================================
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const respostaBeneficios = await fetch(`${API_URL}/beneficios`);
        listaDeBeneficiosDisponiveis = await respostaBeneficios.json();

        const respostaFamilia = await fetch(`${API_URL}/familias/${idFamilia}`);
        if (!respostaFamilia.ok) throw new Error('Família não encontrada.');
        const familia = await respostaFamilia.json();

        preencherFormularioPrincipal(familia);

        if (familia.beneficiosFamiliares) {
            familia.beneficiosFamiliares.forEach(b => adicionarInputBeneficioFamilia(b));
        }

        if (familia.membros) {
            familia.membros.forEach(membro => adicionarCardMembro(membro));
        }

    } catch (erro) {
        console.error('Erro na inicialização:', erro);
        alert('Erro ao carregar dados da família para edição.');
    }
});

function preencherFormularioPrincipal(familia) {
    const campoNome = document.getElementById('nome-familia');
    const campoFoto = document.getElementById('fotoFamiliaFile');
    const campoTelefone = document.getElementById('telefone');
    const campoRenda = document.getElementById('renda');

    if (campoNome) campoNome.value = familia.nomeFamilia || '';
    if (campoFoto && familia.fotoFamilia && !campoFoto.matches('[type="file"]')) {
        campoFoto.value = familia.fotoFamilia;
    }
    if (campoTelefone) campoTelefone.value = familia.telefone || '';
    if (campoRenda) campoRenda.value = familia.rendaFamiliar || 0;

    if (familia.endereco) {
        const campoRua = document.getElementById('rua');
        const campoNum = document.getElementById('numero');
        const campoBairro = document.getElementById('bairro');
        const campoCidade = document.getElementById('cidade');
        const campoEstado = document.getElementById('estado');
        const campoCep = document.getElementById('cep');

        if (campoRua) campoRua.value = familia.endereco.rua || '';
        if (campoNum) campoNum.value = familia.endereco.numero || '';
        if (campoBairro) campoBairro.value = familia.endereco.bairro || '';
        if (campoCidade) campoCidade.value = familia.endereco.cidade || '';
        if (campoEstado) campoEstado.value = familia.endereco.estado || '';
        if (campoCep) campoCep.value = familia.endereco.cep || '';
    }
}

// ===================================================
// GERENCIAMENTO DE BENEFÍCIOS FAMILIARES (COLETIVOS)
// ===================================================
function adicionarInputBeneficioFamilia(beneficioPreSelecionado = null) {
    const divRow = document.createElement('div');
    divRow.classList.add('form-grid', 'align-items-end', 'mb-2');

    let options = '<option value="">Selecione um benefício...</option>';
    listaDeBeneficiosDisponiveis.forEach(b => {
        const selected = beneficioPreSelecionado && beneficioPreSelecionado.idBeneficio === b.id ? 'selected' : '';
        options += `<option value="${b.id}" data-nome="${b.nome}" data-valor="${b.valorBase}" ${selected}>${b.nome} (R$ ${b.valorBase})</option>`;
    });

    divRow.innerHTML = `
        <div class="form-group" style="flex: 1;">
            <select class="select-beneficio-familia" required>
                ${options}
            </select>
        </div>
        <div style="width: auto;">
            <button type="button" class="btn btn-danger btn-remover-linha">Remover</button>
        </div>
    `;

    divRow.querySelector('.btn-remover-linha').addEventListener('click', () => divRow.remove());
    containerBeneficiosFamilia.appendChild(divRow);
}

if (btnAddBeneficioFamilia) {
    btnAddBeneficioFamilia.addEventListener('click', () => adicionarInputBeneficioFamilia());
}

// ===================================================
// GERENCIAMENTO DE MEMBROS E BENEFÍCIOS INDIVIDUAIS
// ===================================================
function adicionarCardMembro(membro = null) {
    const divMembro = document.createElement('div');
    divMembro.classList.add('card-dinamico', 'bloco-membro');

    const idUnicoMembro = membro ? membro.idPessoa : 'PES-' + Date.now() + '-' + Math.floor(Math.random() * 100);
    const fotoAtual = membro["imagem-membro"] 
        

    divMembro.innerHTML = `
        <div class="membro-header">
            <h4>Dados do Membro</h4>
            <button type="button" class="btn btn-danger btn-small btn-remover-membro">Excluir Membro</button>
        </div>
        <input type="hidden" class="membro-id" value="${idUnicoMembro}">
        <input type="hidden" class="membro-foto-atual" value="${fotoAtual}">
        
        <div class="grid-2">
            <div class="form-group">
                <label>Nome Completo *</label>
                <input type="text" class="membro-nome" value="${membro ? membro.nome : ''}" required>
            </div>
                <div class="form-group">
                <label>Categoria *</label>
                <select class="membro-categoria" required>
                    <option value="Responsável" ${membro && membro.categoria === 'Responsável' ? 'selected' : ''}>Responsável</option>
                    <option value="Dependente" ${membro && membro.categoria === 'Dependente' ? 'selected' : ''}>Dependente</option>
                </select>
            </div>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label>Data de Nascimento</label>
                <input type="date" class="membro-data-nascimento" value="${membro?.dataNascimento || ''}">
            </div>
            <div class="form-group">
                <label>Parentesco</label>
                <input type="text" class="membro-parentesco" value="${membro ? membro.parentesco : ''}" placeholder="Ex: Filho, Cônjuge" required>
            </div>
        </div>
        <div class="grid-2">
            <div class="form-group">
                <label>Escolaridade</label>
                <input type="text" class="membro-escolaridade" value="${membro ? membro.escolaridade : ''}">
            </div>
            <div class="form-group">
                <label>Ocupação</label>
                <input type="text" class="membro-ocupacao" value="${membro ? membro.ocupacao : ''}">
            </div>
        </div>
        <div class="form-group">
            <label>Foto do Membro (Anexar arquivo) *</label>
            <input type="file" class="membro-foto-file" accept="image/*">
        </div>
        

        <div class="beneficios-individuais-section">
            <div class="d-flex justify-content-between align-items-center mb-2">
                <h5 style="font-size: 1rem; margin: 0; color: var(--color-primary);">Benefícios Individuais</h5>
                <button type="button" class="btn btn-secondary btn-small btn-add-beneficio-individual">+ Adicionar</button>
            </div>
            <div class="container-beneficios-individuais"></div>
        </div>
    `;

    divMembro.querySelector('.btn-remover-membro').addEventListener('click', () => divMembro.remove());

    const containerIndividuais = divMembro.querySelector('.container-beneficios-individuais');
    const btnAddIndividual = divMembro.querySelector('.btn-add-beneficio-individual');

    const adicionarLinhaBeneficioIndividual = (beneficioIndPre = null) => {
        const rowInd = document.createElement('div');
        rowInd.classList.add('d-flex', 'gap-2', 'mb-2');

        let options = `<option value="">Selecione...</option>`;
        listaDeBeneficiosDisponiveis.forEach(b => {
            const selected = beneficioIndPre && beneficioIndPre.idBeneficio === b.id ? 'selected' : '';
            options += `<option value="${b.id}" data-nome="${b.nome}" data-valor="${b.valorBase}" ${selected}>${b.nome}</option>`;
        });

        rowInd.innerHTML = `
            <select class="select-beneficio-individual" style="flex: 1;" required>${options}</select>
            <button type="button" class="btn btn-danger btn-small btn-remover-ind">X</button>`

        rowInd.querySelector('.btn-remover-ind').addEventListener('click', () => rowInd.remove());
        containerIndividuais.appendChild(rowInd);
    };

    if (membro && membro.beneficiosIndividuais) {
        membro.beneficiosIndividuais.forEach(bi => adicionarLinhaBeneficioIndividual(bi));
    }

    btnAddIndividual.addEventListener('click', () => adicionarLinhaBeneficioIndividual());

    containerMembros.appendChild(divMembro);
}

if (btnAddMembro) {
    btnAddMembro.addEventListener('click', () => adicionarCardMembro());
}

async function fazerUploadImagem(arquivo) {
    const formData = new FormData();
    formData.append("image", arquivo);

    const API_KEY = "8932c05214fe51a1bd87a060fd6b690b"; 
    
    try {
        const response = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
            method: "POST",
            body: formData
        });
        const data = await response.json();
        return data.data.url;
    } catch (error) {
        console.error("Erro ao subir imagem:", error);
    }
}

// ===================================================
// EVENTO SUBMIT: MONTAGEM DO OBJETO E ENVIO VIA PUT
// ===================================================
if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();

        try {
            const respostaOriginal = await fetch(`${API_URL}/familias/${idFamilia}`);
            if (!respostaOriginal.ok) throw new Error('Família não encontrada no banco.');
            const familiaOriginal = await respostaOriginal.json();

            let fotoFamiliaUrl = familiaOriginal.fotoFamilia;
            const campoFotoFamilia = document.getElementById('fotoFamiliaFile');
            if (campoFotoFamilia && campoFotoFamilia.files && campoFotoFamilia.files[0]) {
                fotoFamiliaUrl = await fazerUploadImagem(campoFotoFamilia.files[0]);
            } else if (campoFotoFamilia && campoFotoFamilia.value && !campoFotoFamilia.matches('[type="file"]')) {
                fotoFamiliaUrl = campoFotoFamilia.value;
            }

            const beneficiosFamiliaresAtualizados = [];
            document.querySelectorAll('.select-beneficio-familia').forEach(select => {
                if (select.value) {
                    const optionSelecionada = select.options[select.selectedIndex];
                    beneficiosFamiliaresAtualizados.push({
                        idBeneficio: select.value,
                        nome: optionSelecionada.getAttribute('data-nome'),
                        valor: parseFloat(optionSelecionada.getAttribute('data-valor')) || 0
                    });
                }
            });

            const membrosAtualizados = [];
            const blocosMembros = document.querySelectorAll('.bloco-membro');

            for (const bloco of blocosMembros) {
                const beneficiosIndividuais = [];
                bloco.querySelectorAll('.select-beneficio-individual').forEach(selectInd => {
                    if (selectInd.value) {
                        const optionSelecionada = selectInd.options[selectInd.selectedIndex];
                        beneficiosIndividuais.push({
                            idBeneficio: selectInd.value,
                            nome: optionSelecionada.getAttribute('data-nome'),
                            valor: parseFloat(optionSelecionada.getAttribute('data-valor')) || 0
                        });
                    }
                });

                // Verifica se foi anexada uma nova foto para o membro
                let fotoMembroUrl = bloco.querySelector('.membro-foto-atual').value;
                const inputFotoFile = bloco.querySelector('.membro-foto-file');
                if (inputFotoFile && inputFotoFile.files && inputFotoFile.files[0]) {
                    fotoMembroUrl = await fazerUploadImagem(inputFotoFile.files[0]);
                }

                const membroOriginal =
                    familiaOriginal.membros.find(
                        m => m.idPessoa === bloco.querySelector('.membro-id').value
                    );

                membrosAtualizados.push({
                    ...membroOriginal,

                    nome: bloco.querySelector('.membro-nome').value,
                    dataNascimento: bloco.querySelector('.membro-data-nascimento')?.value || null,
                    parentesco: bloco.querySelector('.membro-parentesco')?.value,
                    "imagem-membro": fotoMembroUrl,
                    categoria: bloco.querySelector('.membro-categoria').value,
                    escolaridade: bloco.querySelector('.membro-escolaridade').value,
                    ocupacao: bloco.querySelector('.membro-ocupacao').value,
                    beneficiosIndividuais: beneficiosIndividuais
                });
            }

            const objetoFamiliaAtualizado = {
                ...familiaOriginal,
                nomeFamilia: document.getElementById('nome-familia').value,
                fotoFamilia: fotoFamiliaUrl,
                telefone: document.getElementById('telefone').value,
                rendaFamiliar: parseFloat(document.getElementById('renda').value) || 0,
                endereco: {
                    rua: document.getElementById('rua').value,
                    numero: document.getElementById('numero').value,
                    bairro: document.getElementById('bairro').value,
                    cidade: document.getElementById('cidade').value,
                    estado: document.getElementById('estado').value,
                    cep: document.getElementById('cep').value
                },
                beneficiosFamiliares: beneficiosFamiliaresAtualizados,
                membros: membrosAtualizados
            };

            const respostaPut = await fetch(`${API_URL}/familias/${idFamilia}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objetoFamiliaAtualizado)
            });

            if (!respostaPut.ok) throw new Error('Falha ao atualizar dados no servidor.');
            
            window.location.href = "familias.html";
            alert('Alterações salvas com sucesso!');

            window.location.href = "familias.html";

        } catch (erro) {
            console.error('Erro ao guardar alterações:', erro);
            alert('Erro ao guardar as alterações: ' + erro.message);
        }
    });
}