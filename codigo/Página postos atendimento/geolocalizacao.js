let postos = [];
let markers = [];
let userMarker = null;
const map = L.map('map', { zoomControl: true, attributionControl: true });
map.setView([-19.92, -43.94], 12);
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  attribution: '© <a href="https://www.openstreetmap.org">OpenStreetMap</a> contributors © <a href="https://carto.com">CARTO</a>',
  subdomains: 'abcd', maxZoom: 19
}).addTo(map);
fetch('postos.json')
  .then(response => {
    if (!response.ok) throw new Error();
    return response.json();
  })
  .then(data => {
    postos = data;
    inicializarDadosEMapa();
  })
  .catch(() => {
    document.getElementById('postoList').innerHTML =
      '<div style="padding:16px;color:#d32f2f;font-size:.85rem;">⚠️ Se deu isso é porque o json não carregou.</div>';
  });
function inicializarDadosEMapa() {
  const maxAtt = Math.max(...postos.map(p => p.atendimentos));
  const minAtt = Math.min(...postos.map(p => p.atendimentos));
  
  const heatLayer = L.layerGroup();
  postos.forEach(p => {
    const norm = (p.atendimentos - minAtt) / (maxAtt - minAtt);
    const radius = 600 + norm * 1400;
    let heatColor = '#ff2200';
    let opacityBase = 0.35;
    if (norm < 0.25) { heatColor = '#00aaff'; opacityBase = 0.18; }
    else if (norm < 0.45) { heatColor = '#44dd66'; opacityBase = 0.22; }
    else if (norm < 0.65) { heatColor = '#ffdd00'; opacityBase = 0.26; }
    else if (norm < 0.82) { heatColor = '#ff8800'; opacityBase = 0.30; }
    for (let i = 3; i >= 1; i--) {
      L.circle([p.lat, p.lon], {
        radius: radius * i * 0.55,
        color: 'transparent',
        fillColor: heatColor,
        fillOpacity: opacityBase / i,
        interactive: false
      }).addTo(heatLayer);
   }
  });
  heatLayer.addTo(map);
  postos.forEach((p, i) => {
    let col = '#1a3fa4';
    if (p.atendimentos >= 500) col = '#d32f2f';
    else if (p.atendimentos >= 380) col = '#f57c00';
    const icon = L.divIcon({
      className: '',
      html: `<div style="width:28px;height:28px;background:${col};border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:2.5px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.3);"></div>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -28]
    });
    const popup = L.popup({ closeButton: false }).setContent(`
      <div class="popup-inner">
        <div class="popup-nome">${p.nome}</div>
        <div class="popup-addr">${p.endereco}</div>
        <div class="popup-row">
          <span class="popup-chip chip-blue">CRAS</span>
          <span class="popup-chip chip-yellow">${p.atendimentos} atend./mês</span>
        </div>
      </div>
    `);
    const marker = L.marker([p.lat, p.lon], { icon }).addTo(map).bindPopup(popup);
    marker.on('click', () => focarItemNaLista(i));
    markers.push(marker);
  });
  renderizarListaLateral();
  const topPosto = postos.reduce((a, b) => a.atendimentos > b.atendimentos ? a : b);
  document.getElementById('topPosto').textContent = topPosto.nome.replace('CRAS ', '');
}
const listaContainer = document.getElementById('postoList');
function renderizarListaLateral(filtro = '') {
  listaContainer.innerHTML = '';
  const q = filtro.toLowerCase();
  postos.forEach((p, i) => {
    if (q && !p.nome.toLowerCase().includes(q) && !p.endereco.toLowerCase().includes(q)) return;
    let pinCol = '#1a3fa4';
    if (p.atendimentos >= 500) pinCol = '#d32f2f';
    else if (p.atendimentos >= 380) pinCol = '#f57c00';
    const item = document.createElement('div');
    item.className = 'posto-item';
    item.dataset.idx = i;
    item.innerHTML = `
      <div class="posto-dot" style="background:${pinCol}"></div>
      <div class="posto-info">
        <div class="name">${p.nome}</div>
        <div class="addr">${p.endereco}</div>
      </div>
      <div class="posto-badge" style="background:#e8eeff; color:#1a3fa4">${p.atendimentos}/mês</div>
    `;
    item.addEventListener('click', () => {
      map.setView([p.lat, p.lon], 15, { animate: true });
      markers[i].openPopup();
      focarItemNaLista(i);
    });
    listaContainer.appendChild(item);
  });
}
function focarItemNaLista(idx) {
  const items = listaContainer.querySelectorAll('.posto-item');
  items.forEach(el => el.classList.remove('active'));
  const alvo = listaContainer.querySelector(`[data-idx="${idx}"]`);
  if (alvo) {
    alvo.classList.add('active');
    alvo.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
}
function filterPostos() {
  renderizarListaLateral(document.getElementById('searchInput').value);
}
function resetView() {
  map.setView([-19.92, -43.94], 12, { animate: true });
}
function toggleMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}
function calcularDistanciaHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
}
function encontrarMaisProximo() {
  if (!navigator.geolocation) {
    alert('Seu navegador não suporta geolocalização.');
    return;
  }
  const card = document.getElementById('nearbyCard');
  if (card) card.style.display = 'block';
  const resultContainer = document.getElementById('nearbyResult');
  if (resultContainer) resultContainer.innerHTML = '<div style="padding:4px 0">📍 Obtendo sua localização precisa…</div>';
  const geoOptions = {
    enableHighAccuracy: true, 
    timeout: 10000,      
    maximumAge: 0            
  };
  navigator.geolocation.getCurrentPosition(async (posicao) => {
    const minhaLat = posicao.coords.latitude;
    const minhaLon = posicao.coords.longitude;
    if (userMarker) map.removeLayer(userMarker);
    userMarker = L.circleMarker([minhaLat, minhaLon], {
      radius: 10, color: '#fff', weight: 3,
      fillColor: '#1e7c44', fillOpacity: 1
    }).addTo(map).bindPopup('📍 Você está aqui').openPopup();
    if (resultContainer) resultContainer.innerHTML = '<div style="padding:4px 0">🔄 Calculando melhor rota pelas ruas…</div>';
    let postosCandidatos = postos.map((p, originalIdx) => {
      return { ...p, originalIdx, distHaversine: calcularDistanciaHaversine(minhaLat, minhaLon, p.lat, p.lon) };
    });
    postosCandidatos.sort((a, b) => a.distHaversine - b.distHaversine);
    const topCandidatos = postosCandidatos.slice(0, 3);
    let postoMaisProximo = null;
    let menorDistanciaRua = Infinity;
    let melhorIdx = 0;
    for (const candidato of topCandidatos) {
      try {
        const urlOSRM = `https://router.project-osrm.org/route/v1/driving/${minhaLon},${minhaLat};${candidato.lon},${candidato.lat}?overview=false`;
        const res = await fetch(urlOSRM);
        const rData = await res.json();
        if (rData.code === 'Ok' && rData.routes.length > 0) {
          const distanciaMetros = rData.routes[0].distance; 
          const distanciaKm = distanciaMetros / 1000;
          if (distanciaKm < menorDistanciaRua) {
            menorDistanciaRua = distanciaKm;
            postoMaisProximo = candidato;
            melhorIdx = candidato.originalIdx;
          }
        }
      } catch (err) {
        console.error("Erro ao consultar rota do OSRM, usando Haversine como fallback", err);
        if (candidato.distHaversine < menorDistanciaRua) {
          menorDistanciaRua = candidato.distHaversine;
          postoMaisProximo = candidato;
          melhorIdx = candidato.originalIdx;
        }
      }
    }
  const urlWaze = `https://waze.com/ul?ll=${postoMaisProximo.lat},${postoMaisProximo.lon}&navigate=yes`;
    if (resultContainer) {
      resultContainer.innerHTML = `
        <div>Posto mais próximo:</div>
        <div class="posto-name" style="font-weight:700; color:#1a3fa4; margin: 2px 0;">${postoMaisProximo.nome}</div>
        <div style="font-size:.78rem;color:#5a6380;margin:4px 0 6px">${postoMaisProximo.endereco}</div>
        <div style="margin: 8px 0 12px 0;">
          <span class="dist" style="background: #e8eeff; color: #1a3fa4; display: block; padding: 8px 10px; border-radius: 8px; font-weight: 600; font-size: 0.85rem; text-align: left; border: 1px solid rgba(26,63,164,0.15)">
            <strong>Distância real por ruas:</strong> ${menorDistanciaRua.toFixed(2)} km
          </span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          <a href="${urlWaze}" target="_blank" class="btn" style="display: inline-flex; justify-content: center; align-items: center; width: 100%; text-decoration: none; font-size: 0.82rem; padding: 10px 12px; color: #000 !important; font-weight: 600; border-radius: 8px; box-sizing: border-box; background: #33ccff; border: none; transition: background 0.2s;">
            🚙 Abrir no Waze
          </a>
        </div>
      `;
}
    map.setView([postoMaisProximo.lat, postoMaisProximo.lon], 15, { animate: true });
    if (markers[melhorIdx]) markers[melhorIdx].openPopup();
    focarItemNaLista(melhorIdx);

  }, () => {
    if (resultContainer) resultContainer.innerHTML = '<div style="color:#d32f2f">Não foi possível obter sua localização. Verifique as permissões de GPS do seu navegador.</div>';
  }, geoOptions);
}