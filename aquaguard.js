// Função para fechar o aviso
function fecharAviso() {
    document.getElementById('aviso-pedagogico').style.display = 'none';
}

// GERADOR DE BOLHAS
const bg = document.getElementById('bubble-bg');
for (let i = 0; i < 15; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.style.width = Math.random() * 30 + 10 + 'px';
    b.style.height = b.style.width;
    b.style.left = Math.random() * 100 + 'vw';
    b.style.animationDuration = (Math.random() * 5 + 5) + 's';
    bg.appendChild(b);
}

let irrigando = false;
let nivel = 80;
let solo = 45;
let speedMode = 'real';
let intervalo;

function atualizarAviso(msg, cor) {
    const alertBox = document.getElementById('radar-alert');
    const dot = document.getElementById('radar-dot');
    const text = document.getElementById('radar-text');
    text.innerText = msg;
    alertBox.style.borderLeftColor = cor;
    dot.style.background = cor;
}

function setSpeed(mode) {
    speedMode = mode;
    document.getElementById('sp-real').classList.toggle('active', mode === 'real');
    document.getElementById('sp-sim').classList.toggle('active', mode === 'sim');
    document.getElementById('txt-mode').innerText = "Modo: " + (mode === 'real' ? "Tempo Real" : "Simulação 24h");
    if(irrigando) { pararIrrigacao(); toggleChuva(); }
}

function toggleChuva() {
    const btn = document.getElementById('btn-chuva');
    const pulso = document.getElementById('tipo-pulso').value;
    if (!irrigando) {
        if (nivel <= 1) { atualizarAviso("ERRO CRÍTICO: VOLUME INSUFICIENTE", "#ff5a5f"); return; }
        irrigando = true;
        btn.innerText = "PARAR IRRIGAÇÃO";
        btn.classList.add('active');
        atualizarAviso(`SISTEMA ATIVO // IRRIGANDO VIA ${pulso.toUpperCase()}`, "#00f5d4");
        let taxaConsumo = speedMode === 'real' ? 0.05 : 0.8;
        let taxaSolo = speedMode === 'real' ? 0.08 : 1.2;
        if (pulso === 'longo') { taxaConsumo *= 2; taxaSolo *= 2; }
        if (pulso === 'curto') { taxaConsumo *= 0.5; taxaSolo *= 0.5; }
        intervalo = setInterval(() => {
            if (nivel > 0) { nivel -= taxaConsumo; solo += taxaSolo; if (solo > 98) solo = 98; atualizarTela(); }
            else { pararIrrigacao(); }
        }, 100);
    } else { pararIrrigacao(); atualizarAviso("SISTEMA ONLINE // AGUARDANDO...", "#00f5d4"); }
}

function pararIrrigacao() {
    irrigando = false;
    clearInterval(intervalo);
    const btn = document.getElementById('btn-chuva');
    btn.innerText = "LIGAR IRRIGAÇÃO";
    btn.classList.remove('active');
    document.getElementById('vazao').innerText = "0 L/s";
}

function atualizarTela() {
    document.getElementById('water-fill').style.height = nivel + "%";
    document.getElementById('txt-perc').innerText = Math.floor(nivel) + "%";
    document.getElementById('solo-val').innerText = Math.floor(solo) + "%";
    const pulso = document.getElementById('tipo-pulso').value;
    let vazaoBase = (speedMode === 'real' ? 2.5 : 45.0);
    if (pulso === 'longo') vazaoBase *= 2;
    if (pulso === 'curto') vazaoBase *= 0.5;
    document.getElementById('vazao').innerText = irrigando ? vazaoBase.toFixed(1) + " L/s" : "0 L/s";
    const fill = document.getElementById('water-fill');
    if (nivel < 20) {
        fill.style.background = "var(--danger)";
        atualizarAviso("ATENÇÃO: NÍVEL HÍDRICO ABAIXO DE 20%", "#ffbe0b");
    }
}

function resetSim() {
    nivel = 80; solo = 30 + Math.random() * 20;
    pararIrrigacao(); atualizarTela();
    atualizarAviso("SISTEMA ONLINE // ÁREA ALTERADA...", "#00f5d4");
    const setor = document.getElementById('setor').value;
    const title = document.getElementById('display-title');
    const sugestao = document.getElementById('sugestao-ia');
    if(setor === 'nascente') { title.innerText = "Nível da Reserva"; sugestao.innerText = "Preservação: Irrigação restrita."; }
    else if(setor === 'estufa') { title.innerText = "Nível Hidropônico"; sugestao.innerText = "Estufa exige pulsos constantes."; }
    else { title.innerText = "Nível do Reservatório"; sugestao.innerText = "Sistema estável. Recomendamos pulsos curtos."; }
}
