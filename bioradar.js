const ofertas = [
    { id: 1, nome: "Cama de Frango", fazenda: "Fazenda Santa Maria", cat: "Fertilizante", vol: "10 ton", impact: "-2.4t CO2", lat: "40%", lng: "30%", desc: "Rico em nitrogênio, ideal para milho e soja." },
    { id: 2, nome: "Bagaço de Cana", fazenda: "Usina Alvorada", cat: "Biomassa", vol: "100 m\u00B3", impact: "-5.0t CO2", lat: "25%", lng: "70%", desc: "Excelente para queima em caldeiras industriais." },
    { id: 3, nome: "Soro de Leite", fazenda: "Latic\u00EDnios Vale Verde", cat: "Ra\u00E7\u00E3o", vol: "5000L", impact: "-1.2t CO2", lat: "60%", lng: "55%", desc: "Subproduto l\u00EDquido para alimenta\u00E7\u00E3o de su\u00EDnos." },
    { id: 4, nome: "Casca de Arroz", fazenda: "Gr\u00E3os do Sul", cat: "Biomassa", vol: "20 ton", impact: "-3.1t CO2", lat: "75%", lng: "20%", desc: "Material seco para forra\u00E7\u00E3o de solos ou energia." },
    { id: 5, nome: "Esterco Bovino", fazenda: "Pecu\u00E1ria Horizonte", cat: "Fertilizante", vol: "15 ton", impact: "-4.0t CO2", lat: "45%", lng: "85%", desc: "Curtido e pronto para espalhamento em pastagens." },
    { id: 6, nome: "Restos de Silagem", fazenda: "S\u00EDtio Novo", cat: "Ra\u00E7\u00E3o", vol: "5 ton", impact: "-0.8t CO2", lat: "15%", lng: "45%", desc: "Excedente de produ\u00E7\u00E3o de silagem de milho." }
];

let categoriaAtual = "Todos";
let idSelecionado = null;

function fecharAviso() { 
    document.getElementById('modal-aviso').style.display = 'none'; 
    renderizar(); 
}

function renderizar(focoId = null) {
    const list = document.getElementById('offerList');
    const map = document.getElementById('mapContainer');
    const search = document.getElementById('searchInput').value.toLowerCase();
    
    list.innerHTML = "";
    const markers = document.querySelectorAll('.marker');
    markers.forEach(m => m.remove());

    ofertas.forEach(o => {
        const matchSearch = o.nome.toLowerCase().includes(search) || o.fazenda.toLowerCase().includes(search);
        const matchCat = categoriaAtual === "Todos" || o.cat === categoriaAtual;

        if (matchSearch && matchCat) {
            // Renderiza lista lateral
            list.innerHTML += `
                <div class="offer-item" onclick="selecionarProduto(${o.id})">
                    <small style="color: var(--primary)">${o.cat}</small>
                    <div style="font-size:0.9rem">${o.nome}</div>
                    <small style="color:#64748b">${o.fazenda}</small>
                </div>
            `;

            // Lógica para mostrar apenas UM ou TODOS no mapa
            if (focoId === null || focoId === o.id) {
                const m = document.createElement('div');
                m.className = 'marker';
                m.style.top = o.lat;
                m.style.left = o.lng;
                m.onclick = () => selecionarProduto(o.id);
                map.appendChild(m);
            }
        }
    });
}

function selecionarProduto(id) {
    idSelecionado = id;
    renderizar(id); // Re-renderiza o mapa focando apenas neste ID
    showInfo(id);
}

function showInfo(id) {
    const o = ofertas.find(item => item.id === id);
    const panel = document.getElementById('info-panel');
    panel.style.display = 'block';
    document.getElementById('info-title').innerText = o.nome;
    document.getElementById('info-farm').innerText = o.fazenda + " (" + o.vol + ")";
    document.getElementById('info-desc').innerText = o.desc;
    document.getElementById('info-impact').innerText = o.impact + " eq";
}

function realizarMatch() {
    alert('Match realizado! Conexão estabelecida com sucesso. Verifique seu e-mail para os próximos passos.');
    fecharPainel();
}

function fecharPainel() {
    document.getElementById('info-panel').style.display = 'none';
    idSelecionado = null;
    renderizar(); // Volta a mostrar todos
}

function filtrar() { 
    idSelecionado = null; 
    renderizar(); 
}

function filtrarCategoria(cat, element) {
    categoriaAtual = cat;
    idSelecionado = null;
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    element.classList.add('active');
    renderizar();
}

function resetarMapa() {
    document.getElementById('searchInput').value = "";
    categoriaAtual = "Todos";
    document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tag')[0].classList.add('active');
    fecharPainel();
}
