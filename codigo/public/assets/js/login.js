const API_USUARIOS = 'http://localhost:3000/assistentes-sociais';
const API_PONTOS = 'http://localhost:3000/pontos-atendimento';
 
/* ── Toast ──────────────────────── */
function showToast(msg, tipo = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `meu-toast ${tipo}`;
  const icon = tipo === 'success' ? '✅' : tipo === 'error' ? '❌' : 'ℹ️';
  toast.innerHTML = `<span>${icon}</span> ${msg}`;
  
  container.appendChild(toast);
  
  setTimeout(() => toast.remove(), 2000);
}
 
/* ── Alternar entre aba Entrar / Criar Conta ────────────────── */
function alternarAba(aba) {
  const ehLogin = aba === 'login';
  document.getElementById('formLogin').style.display = ehLogin ? 'flex' : 'none';
  document.getElementById('formCadastro').style.display = ehLogin ? 'none' : 'flex';
  document.getElementById('tabLogin').classList.toggle('active', ehLogin);
  document.getElementById('tabCadastro').classList.toggle('active', !ehLogin);
}
 
/* ── Mostrar/ocultar senha ───────────────────────────────────── */
function alternarVisibilidadeSenha(inputId, botao) {
  const input = document.getElementById(inputId);
  const oculto = input.type === 'password';
  input.type = oculto ? 'text' : 'password';
  botao.textContent = oculto ? 'Ocultar' : 'Ver';
}
 
/* ── Helpers de erro de campo ────────────────────────────────── */
function limparErros(form) {
  form.querySelectorAll('.field-error').forEach(el => el.textContent = '');
  form.querySelectorAll('input').forEach(el => el.classList.remove('invalid'));
}
function marcarErro(inputId, erroId, msg) {
  document.getElementById(inputId)?.classList.add('invalid');
  const erro = document.getElementById(erroId);
  if (erro) erro.textContent = msg;
}
function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function validarTelefone(telefone) {
  return /^\(\d{2}\)\s?\d{4,5}-\d{4}$/.test(telefone);
}
function formatarTelefone(valor) {
  const digitos = valor.replace(/\D/g, '').slice(0, 11);
  if (digitos.length <= 2) return digitos.length ? `(${digitos}` : '';
  if (digitos.length <= 6) return `(${digitos.slice(0, 2)}) ${digitos.slice(2)}`;
  if (digitos.length <= 10) return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 6)}-${digitos.slice(6)}`;
  return `(${digitos.slice(0, 2)}) ${digitos.slice(2, 7)}-${digitos.slice(7)}`;
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
 
/* ── Gera o próximo ID no padrão AS-XXX a partir dos já cadastrados ── */
function gerarProximoIdAssistente(listaUsuarios) {
  const numeros = listaUsuarios
    .map(u => parseInt(String(u.id || '').replace('AS-', ''), 10))
    .filter(n => !isNaN(n));
  const proximo = numeros.length ? Math.max(...numeros) + 1 : 1;
  return `AS-${String(proximo).padStart(3, '0')}`;
}
 
/* ── Carrega a lista de CRAS disponíveis no select de cadastro ──── */
async function carregarOpcoesCras() {
  const select = document.getElementById('cadastroCras');
  if (!select) return;
  try {
    const res = await fetch(`${API_PONTOS}?tipo=CRAS`);
    if (!res.ok) throw new Error('Falha ao consultar pontos de atendimento');
    const postos = await res.json();
    postos
      .sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'))
      .forEach(posto => {
        const option = document.createElement('option');
        option.value = posto.nome;
        option.textContent = posto.nome;
        select.appendChild(option);
      });
  } catch (err) {
    showToast('Não foi possível carregar a lista de CRAS.', 'error');
  }
}
 
/* ═══════════════════════════════════════════════════════════════
   LOGIN
═══════════════════════════════════════════════════════════════ */
async function validarESubmeterLogin(e) {
  e.preventDefault();
  const form = document.getElementById('formLogin');
  limparErros(form);
 
  const email = document.getElementById('loginEmail').value.trim();
  const senha = document.getElementById('loginSenha').value;
  let valido = true;
 
  if (!email || !validarEmail(email)) {
    marcarErro('loginEmail', 'erroLoginEmail', 'Informe um e-mail válido.');
    valido = false;
  }
  if (!senha) {
    marcarErro('loginSenha', 'erroLoginSenha', 'Informe sua senha.');
    valido = false;
  }
  if (!valido) return;
 
  const btn = document.getElementById('btnEntrar');
  btn.disabled = true;
  btn.textContent = 'Entrando...';
 
  try {
    // Busca pelo email
    const res = await fetch(`${API_USUARIOS}?email=${encodeURIComponent(email)}`);
    if (!res.ok) throw new Error('Falha ao consultar usuários');
    
    const usuarios = await res.json();
    
    // Verifica se a lista veio vazia (email não existe) ou se a senha não bate
    const usuario = usuarios.find(u => u.senha === senha);
 
    if (!usuario) {
      showToast('E-mail ou senha incorretos.', 'error');
      // Desabilitamos o loading do botão manualmente aqui antes de parar a execução
      btn.disabled = false;
      btn.innerHTML = '<span class="btn-icon">🔓</span> Entrar';
      return; 
    }
 
    const manterConectado = document.getElementById('manterConectado').checked;
    const storage = manterConectado ? localStorage : sessionStorage;
    storage.setItem('usuarioLogado', JSON.stringify({ id: usuario.id, nome: usuario.nome, email: usuario.email, cras: usuario.cras }));
 
    showToast(`Bem-vindo(a), ${usuario.nome.split(' ')[0]}! 🎉`);
    setTimeout(() => { window.location.href = '../../modulos/familias/familias.html'; }, 1000);

  } catch (err) {
    console.error(err); // Ajuda a inspecionar se o erro foi no fetch ou no contêiner do toast
    showToast('Erro ao conectar. Verifique se o JSONServer está rodando.', 'error');
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">🔓</span> Entrar';
  }
}
 
/* ═══════════════════════════════════════════════════════════════
   CADASTRO
═══════════════════════════════════════════════════════════════ */
async function validarESubmeterCadastro(e) {
  e.preventDefault();
  const form = document.getElementById('formCadastro');
  limparErros(form);
 
  const nome = document.getElementById('cadastroNome').value.trim();
  const telefone = document.getElementById('cadastroTelefone').value.trim();
  const email = document.getElementById('cadastroEmail').value.trim();
  const cras = document.getElementById('cadastroCras').value;
  const arquivoFoto = document.getElementById('cadastroFoto').files[0]; // opcional
  const senha = document.getElementById('cadastroSenha').value;
  const confirmarSenha = document.getElementById('cadastroConfirmarSenha').value;
  let valido = true;
 
  if (!nome) {
    marcarErro('cadastroNome', 'erroCadastroNome', 'Informe seu nome completo.');
    valido = false;
  }
  if (!telefone || !validarTelefone(telefone)) {
    marcarErro('cadastroTelefone', 'erroCadastroTelefone', 'Informe um telefone válido. Ex: (31) 98888-7777');
    valido = false;
  }
  if (!email || !validarEmail(email)) {
    marcarErro('cadastroEmail', 'erroCadastroEmail', 'Informe um e-mail válido.');
    valido = false;
  }
  if (!cras) {
    marcarErro('cadastroCras', 'erroCadastroCras', 'Selecione o CRAS em que você atua.');
    valido = false;
  }
  if (!senha || senha.length < 6) {
    marcarErro('cadastroSenha', 'erroCadastroSenha', 'A senha deve ter ao menos 6 caracteres.');
    valido = false;
  }
  if (confirmarSenha !== senha) {
    marcarErro('cadastroConfirmarSenha', 'erroCadastroConfirmarSenha', 'As senhas não coincidem.');
    valido = false;
  }
  if (!valido) return;
 
  const btn = document.getElementById('btnCriarConta');
  btn.disabled = true;
  btn.textContent = 'Criando conta...';
 
  try {
    const existeRes = await fetch(`${API_USUARIOS}?email=${encodeURIComponent(email)}`);
    const existentes = await existeRes.json();
    if (existentes.length > 0) {
      showToast('Já existe uma conta com esse e-mail.', 'error');
      return;
    }
 
    // Gera o próximo ID no padrão AS-XXX com base nos usuários já cadastrados
    const todosRes = await fetch(API_USUARIOS);
    const todosUsuarios = await todosRes.json();
    const novoId = gerarProximoIdAssistente(todosUsuarios);
 
    // A foto é opcional; se enviada, é convertida em base64 para ser salva no JSON
    const foto = await fazerUploadImagem(arquivoFoto);
 
    await fetch(API_USUARIOS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: novoId,
        nome,
        telefone,
        email,
        senha,
        'imagem-assistente': foto,
        cras,
        'familias-assistidas': [],
        dataCadastro: new Date().toISOString()
      })
    });
 
    showToast('Conta criada com sucesso! Faça login para continuar. 🎉');
    form.reset();
    alternarAba('login');
    document.getElementById('loginEmail').value = email;
  } catch (err) {
    showToast('Erro ao criar conta. Verifique se o JSONServer está rodando.', 'error');
  } finally {
    btn.disabled = false;
    btn.innerHTML = '<span class="btn-icon">✅</span> Criar Conta';
  }
}
 
/* ── Inicialização ───────────────────────────────────────────── */
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('formLogin').addEventListener('submit', validarESubmeterLogin);
  document.getElementById('formCadastro').addEventListener('submit', validarESubmeterCadastro);
 
  carregarOpcoesCras();
 
  const inputTelefone = document.getElementById('cadastroTelefone');
  inputTelefone?.addEventListener('input', () => {
    inputTelefone.value = formatarTelefone(inputTelefone.value);
  });
 
  document.getElementById('btnVerSenhaLogin').addEventListener('click', function () {
    alternarVisibilidadeSenha('loginSenha', this);
  });
  document.getElementById('btnVerSenhaCadastro').addEventListener('click', function () {
    alternarVisibilidadeSenha('cadastroSenha', this);
  });
 
  document.getElementById('linkEsqueciSenha').addEventListener('click', e => {
    e.preventDefault();
    showToast('Funcionalidade de recuperação de senha em desenvolvimento.', 'info');
  });
 
  // Se já houver sessão ativa, redireciona direto
  const logado = localStorage.getItem('usuarioLogado') || sessionStorage.getItem('usuarioLogado');
  if (logado) {
    showToast('Você já está conectado, redirecionando...');
    setTimeout(() => { window.location.href = '../../modulos/familias/familias.html'; }, 800);
  }
});
