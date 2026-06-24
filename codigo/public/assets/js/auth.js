/*=========================================================
   auth.js — Gerencia a sessão da Assistente Social logada.
=========================================================== */
 
/* Recupera o usuário logado */
function obterUsuarioLogado() {
  const dados = localStorage.getItem('usuarioLogado') || sessionStorage.getItem('usuarioLogado');
  return dados ? JSON.parse(dados) : null;
}
 
/* Encerra a sessão e volta para o login */
function sairDaConta() {
  localStorage.removeItem('usuarioLogado');
  sessionStorage.removeItem('usuarioLogado');
  window.location.href = '../../modulos/inicio/index.html';
}
 
/* Redireciona para o login se não houver sessão ativa e devolve os dados do usuário logado caso exista. */
function protegerPagina() {
  const usuario = obterUsuarioLogado();
  if (!usuario) {
    window.location.href = '../../modulos/login/login.html';
    return null;
  }
  return usuario;
}
 
/* Monta o HTML do menu do usuário que substitui o link "Login"  */
function montarMenuUsuario(usuario) {
  const inicial = (usuario.nome || '?').trim().charAt(0).toUpperCase();
  const primeiroNome = (usuario.nome || '').split(' ')[0];
  return `
    <div class="auth-user-menu">
      <button type="button" class="auth-user-toggle">
        <span class="auth-user-avatar">${inicial}</span>
        <span class="auth-user-nome">${primeiroNome}</span>
        <span class="auth-user-seta">▾</span>
      </button>
      <div class="auth-user-dropdown">
        <a href="perfil.html" class="auth-user-item">👤 Meu perfil</a>
        <button type="button" class="auth-user-item auth-user-sair">🚪 Sair</button>
      </div>
    </div>
  `;
}
 
/* Injeta o CSS do menu do usuário */
function injetarEstiloMenuUsuario() {
  if (document.getElementById('auth-user-menu-style')) return;
  const style = document.createElement('style');
  style.id = 'auth-user-menu-style';
  style.textContent = `
    .auth-user-menu { position: relative; display: inline-block; }
    .auth-user-toggle {
      display: flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.12);
      border: 3px solid rgb(255, 214, 132);
      border-radius: 20px;
      padding: 6px 14px 6px 6px;
      color: black;
      font-family: 'Nunito', sans-serif;
      font-weight: 900;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background 0.18s;
    }
    .auth-user-toggle:hover { background: rgba(255,255,255,0.22); }
    .auth-user-avatar {
      width: 32px; height: 32px;
      border-radius: 50%;
      background: rgb(255, 214, 132);
      color: black;
      display: flex; align-items: center; justify-content: center;
      font-size: 1rem; font-weight: 900;
      flex-shrink: 0;
    }
    .auth-user-seta { font-size: 1.2rem; opacity: 0.85; }
    .auth-user-dropdown {
      display: none;
      position: absolute;
      right: 0; top: calc(100% + 8px);
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
      min-width: 170px;
      overflow: hidden;
      z-index: 1000;
    }
    .auth-user-menu.aberto .auth-user-dropdown { display: block; }
    .auth-user-item {
      display: block;
      width: 100%;
      text-align: left;
      background: none;
      border: none;
      padding: 11px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 1.2rem;
      font-weight: 900;
      color: #1e293b;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.15s;
    }
    .auth-user-item:hover { background: #f1f5f9; }
    .auth-user-sair { color: #dc3545; }
  `;
  document.head.appendChild(style);
}
 
/* Substitui o link "Login" pelo menu do usuário */
function atualizarHeaderComUsuario() {
  const usuario = obterUsuarioLogado();
  if (!usuario) return; // sem sessão: mantém os links de "Login" originais
 
  injetarEstiloMenuUsuario();
 
  document.querySelectorAll('a.link-header, a.botao-amarelo').forEach(link => {
    if (link.textContent.trim().toLowerCase() !== 'login') return;
    const novoElemento = document.createElement('span');
    novoElemento.innerHTML = montarMenuUsuario(usuario);
    link.replaceWith(novoElemento.firstElementChild);
  });
 
  // Abre/fecha o dropdown ao clicar no botão
  document.querySelectorAll('.auth-user-toggle').forEach(botao => {
    botao.addEventListener('click', e => {
      e.stopPropagation();
      const menu = botao.closest('.auth-user-menu');
      document.querySelectorAll('.auth-user-menu.aberto').forEach(m => {
        if (m !== menu) m.classList.remove('aberto');
      });
      menu.classList.toggle('aberto');
    });
  });
 
  // Ação de sair
  document.querySelectorAll('.auth-user-sair').forEach(botao => {
    botao.addEventListener('click', sairDaConta);
  });
 
  // Fecha o dropdown ao clicar fora dele
  document.addEventListener('click', () => {
    document.querySelectorAll('.auth-user-menu.aberto').forEach(m => m.classList.remove('aberto'));
  });
}
 
window.addEventListener('DOMContentLoaded', atualizarHeaderComUsuario);