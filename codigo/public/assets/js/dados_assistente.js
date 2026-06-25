const API_USUARIOS = 'http://localhost:3000/assistentes-sociais';
const API_PONTOS   = 'http://localhost:3000/pontos-atendimento';
 
/* Usuário básico salvo no login (id, nome, email, cras) */
const usuarioLogado      = protegerPagina();
const idAssistenteLogada = usuarioLogado?.id;
 
let perfil         = {};   // dados completos da assistente, vindos do db.json
let perfilOriginal = {};
let modoEdicao      = false;
let fotoSelecionada = null; // arquivo de imagem escolhido durante a edição
 
let postos = [];       // nomes dos CRAS, vindos de /pontos-atendimento
let roletaIndex = 0;
const ITEM_H = 44;
 
document.addEventListener("DOMContentLoaded", async () => {
  if (!usuarioLogado) return; // protegerPagina() já redireciona para o login
 
  await Promise.all([carregarPerfil(), carregarPostos()]);
  construirRoleta();
  bindEventos();
});
 
/* ── Carrega os dados completos da assistente logada a partir do db.json ── */
async function carregarPerfil() {
  try {
    const res = await fetch(`${API_USUARIOS}/${idAssistenteLogada}`);
    if (!res.ok) throw new Error('Assistente não encontrada');
    perfil = await res.json();
  } catch (err) {
    console.error(err);
    mostrarToast("Erro ao carregar o perfil. Verifique se o JSONServer está rodando.");
    return;
  }
  renderPerfil(perfil);
}
 
/* ── Carrega a lista de CRAS disponíveis para a roleta de edição ── */
async function carregarPostos() {
  try {
    const res = await fetch(`${API_PONTOS}?tipo=CRAS`);
    if (!res.ok) throw new Error('Falha ao consultar pontos de atendimento');
    const dados = await res.json();
    postos = dados
      .map(p => p.nome)
      .sort((a, b) => a.localeCompare(b, 'pt-BR'));
  } catch (err) {
    console.error(err);
    postos = [];
  }
}
 
function renderPerfil(assistente = perfil) {
  document.getElementById("headerName").textContent       = assistente.nome || "—";
  document.getElementById("display-nome").textContent     = assistente.nome || "—";
  document.getElementById("display-email").textContent    = assistente.email || "—";
  document.getElementById("display-telefone").textContent = assistente.telefone || "—";
  document.getElementById("cras-text").textContent         = assistente.cras || "—";
 
  atualizarAvatar(assistente);
}
 
function atualizarAvatar(assistente = perfil) {
  const img      = document.getElementById("avatarImg");
  const initials = document.getElementById("avatarInitials");
 
  const fotoSrc = assistente["imagem-assistente"] || obterFotoOrganizacao();
 
  if (fotoSrc) {
    img.onload = () => {
      img.style.display      = "block";
      initials.style.display = "none";
    };
    img.onerror = () => {
      img.style.display      = "none";
      initials.style.display = "block";
      initials.textContent   = gerarIniciais(assistente.nome);
    };
    img.src = fotoSrc;
  } else {
    img.style.display      = "none";
    initials.style.display = "block";
    initials.textContent   = gerarIniciais(assistente.nome);
  }
}
 
/**
 * Fallback usado quando a assistente ainda não tem foto cadastrada.
 * Por enquanto não há foto "padrão" da organização, então retorna null
 * e o avatar exibe as iniciais do nome.
 */
function obterFotoOrganizacao() {
  return null;
}
 
function gerarIniciais(nome) {
  if (!nome) return "?";
  const partes = nome.trim().split(/\s+/);
  if (partes.length === 1) return partes[0][0].toUpperCase();
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}
 
function construirRoleta() {
  const track = document.getElementById("roletaTrack");
  if (!track) return;
 
  track.innerHTML = "";
  postos.forEach((nome, i) => {
    const item = document.createElement("div");
    item.className = "roleta-item";
    item.dataset.index = i;
    item.textContent = nome;
    item.addEventListener("click", () => selecionarRoletaIndex(i));
    track.appendChild(item);
  });
 
  roletaIndex = postos.indexOf(perfil.cras);
  if (roletaIndex < 0) roletaIndex = 0;
  moverRoleta(roletaIndex, false);
}
 
function selecionarRoletaIndex(i) {
  roletaIndex = Math.max(0, Math.min(postos.length - 1, i));
  moverRoleta(roletaIndex, true);
}
 
function moverRoleta(idx, animado) {
  const track = document.getElementById("roletaTrack");
  if (!track) return;
 
  const viewport = document.getElementById("roletaViewport");
  const centro = viewport ? viewport.offsetHeight / 2 : 110;
 
  const offset = -(idx * ITEM_H) + centro - ITEM_H / 2;
  track.style.transition = animado ? "transform .25s cubic-bezier(.4,0,.2,1)" : "none";
  track.style.transform  = `translateY(${offset}px)`;
 
  track.querySelectorAll(".roleta-item").forEach((el, i) => {
    const dist = Math.abs(i - idx);
    el.classList.toggle("roleta-selected", i === idx);
    el.classList.toggle("roleta-near",     dist === 1);
    el.classList.toggle("roleta-far",      dist >= 2);
  });
}
 
function bindRoleta() {
  const viewport = document.getElementById("roletaViewport");
  if (!viewport) return;
 
  viewport.addEventListener("wheel", (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 1 : -1;
    selecionarRoletaIndex(roletaIndex + delta);
  }, { passive: false });
 
  let startY = null, startIdx = null;
 
  const onStart = (y) => { startY = y; startIdx = roletaIndex; };
  const onMove  = (y)  => {
    if (startY === null) return;
    const delta = Math.round((startY - y) / ITEM_H);
    selecionarRoletaIndex(startIdx + delta);
  };
  const onEnd   = ()   => { startY = null; };
 
  viewport.addEventListener("mousedown",  (e) => onStart(e.clientY));
  window .addEventListener("mousemove",   (e) => { if (startY !== null) onMove(e.clientY); });
  window .addEventListener("mouseup",     onEnd);
 
  viewport.addEventListener("touchstart", (e) => onStart(e.touches[0].clientY), { passive: true });
  viewport.addEventListener("touchmove",  (e) => onMove(e.touches[0].clientY),  { passive: true });
  viewport.addEventListener("touchend",   onEnd);
 
  viewport.setAttribute("tabindex", "0");
  viewport.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); selecionarRoletaIndex(roletaIndex + 1); }
    if (e.key === "ArrowUp")   { e.preventDefault(); selecionarRoletaIndex(roletaIndex - 1); }
  });
}
 
function entrarEdicao() {
  modoEdicao = true;
  perfilOriginal = { ...perfil };
  fotoSelecionada = null;
 
  document.getElementById("input-nome").value     = perfil.nome || "";
  document.getElementById("input-email").value    = perfil.email || "";
  document.getElementById("input-telefone").value = perfil.telefone || "";
  document.getElementById("input-senha").value    = "";
 
  roletaIndex = postos.indexOf(perfil.cras);
  if (roletaIndex < 0) roletaIndex = 0;
  moverRoleta(roletaIndex, false);
 
  toggleCampos(true);
 
  document.getElementById("editBanner").classList.add("active");
  document.getElementById("actionBar").style.display   = "none";
  document.getElementById("editActions").style.display = "flex";
  document.getElementById("btnFoto").style.display     = "inline-flex";
}
 
function cancelarEdicao() {
  modoEdicao = false;
  fotoSelecionada = null;
  perfil = { ...perfilOriginal };
 
  toggleCampos(false);
  renderPerfil(perfil);
 
  document.getElementById("editBanner").classList.remove("active");
  document.getElementById("actionBar").style.display   = "flex";
  document.getElementById("editActions").style.display = "none";
  document.getElementById("btnFoto").style.display     = "none";
}
 
async function salvarEdicao() {
  const nome  = document.getElementById("input-nome").value.trim();
  const email = document.getElementById("input-email").value.trim();
  const tel   = document.getElementById("input-telefone").value.trim();
  const senha = document.getElementById("input-senha").value;
 
  if (!nome)  { shake("input-nome");  return; }
  if (!email) { shake("input-email"); return; }
 
  const btnSalvar = document.getElementById("btnSalvar");
  if (btnSalvar) btnSalvar.disabled = true;
 
  try {
    let fotoUrl = perfil["imagem-assistente"];
    if (fotoSelecionada) {
      const urlEnviada = await fazerUploadImagem(fotoSelecionada);
      if (urlEnviada) fotoUrl = urlEnviada;
    }
 
    const dadosAtualizados = {
      nome,
      email,
      telefone: tel,
      cras: postos[roletaIndex] || perfil.cras,
      "imagem-assistente": fotoUrl
    };
    if (senha) dadosAtualizados.senha = senha;
 
    perfil = await salvarPerfilNoServidor(dadosAtualizados);
    fotoSelecionada = null;
    modoEdicao = false;
 
    atualizarSessao(perfil);
    toggleCampos(false);
    renderPerfil(perfil);
 
    document.getElementById("editBanner").classList.remove("active");
    document.getElementById("actionBar").style.display   = "flex";
    document.getElementById("editActions").style.display = "none";
    document.getElementById("btnFoto").style.display     = "none";
 
    mostrarToast("Perfil atualizado com sucesso!");
  } catch (err) {
    console.error(err);
    mostrarToast("Não foi possível salvar. Verifique se o JSONServer está rodando.");
  } finally {
    if (btnSalvar) btnSalvar.disabled = false;
  }
}
 
/* ── Persiste as alterações do perfil no json-server ── */
async function salvarPerfilNoServidor(dadosAtualizados) {
  const res = await fetch(`${API_USUARIOS}/${idAssistenteLogada}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosAtualizados)
  });
  if (!res.ok) throw new Error('Falha ao salvar no servidor');
  return res.json();
}
 
/* ── Atualiza o usuarioLogado salvo no login (mesma chave usada por login.js/auth.js) ── */
function atualizarSessao(assistente) {
  const dadosSessao = {
    id: assistente.id,
    nome: assistente.nome,
    email: assistente.email,
    cras: assistente.cras
  };
  if (localStorage.getItem('usuarioLogado')) {
    localStorage.setItem('usuarioLogado', JSON.stringify(dadosSessao));
  } else {
    sessionStorage.setItem('usuarioLogado', JSON.stringify(dadosSessao));
  }
}
 
function toggleCampos(editando) {
  const campos = ["nome", "email", "telefone", "senha"];
  campos.forEach(c => {
    const display = document.getElementById(`display-${c}`);
    const input   = document.getElementById(`input-${c}`);
    if (!display || !input) return;
    display.style.display = editando ? "none"  : "";
    input.style.display   = editando ? "block" : "none";
  });
 
  document.getElementById("display-cras").style.display  = editando ? "none"  : "flex";
  document.getElementById("roletaWrapper").style.display = editando ? "block" : "none";
}
 
function bindFoto() {
  const input = document.getElementById("inputFoto");
  const btn   = document.getElementById("btnFoto");
  if (!input || !btn) return;
 
  btn.addEventListener("click", () => input.click());
 
  input.addEventListener("change", () => {
    const file = input.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      mostrarToast("Selecione um arquivo de imagem válido.");
      return;
    }
    fotoSelecionada = file;
 
    const reader = new FileReader();
    reader.onload = (e) => {
      atualizarAvatar({ ...perfil, "imagem-assistente": e.target.result });
    };
    reader.readAsDataURL(file);
  });
}
 
/* ── Envia a foto escolhida para o imgbb e retorna a URL pública ── */
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
    return null;
  }
}
 
function shake(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add("shake");
  el.addEventListener("animationend", () => el.classList.remove("shake"), { once: true });
}
 
function mostrarToast(msg) {
  let toast = document.getElementById("toastCustom");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastCustom";
    toast.className = "toast-custom";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove("show"), 3200);
}
 
function bindEventos() {
  document.getElementById("btnEditar")?.addEventListener("click",   entrarEdicao);
  document.getElementById("btnCancelar")?.addEventListener("click", cancelarEdicao);
  document.getElementById("btnSalvar")?.addEventListener("click",   salvarEdicao);
  document.getElementById("btnSair")?.addEventListener("click",       sairDaConta);
  document.getElementById("btnSairMobile")?.addEventListener("click", sairDaConta);
 
  bindFoto();
  bindRoleta();
}