// Captura de instâncias de nós do DOM
const feed = document.getElementById('feed');
const scanner = document.getElementById('scanner');
const results = document.getElementById('results');
const sprayBtn = document.getElementById('sprayBtn');
const tankDisplay = document.getElementById('tank-level');

// Matriz de posicionamento global e variáveis de controle físico
let posX = 0;
let posY = 0;
let zoom = 1;
let altitude = 50;
let isSpraying = false;
let tankLevel = 100;

// Motor de Captura Input de Voo e Eventos de Teclado
document.addEventListener('keydown', (e) => {
    const step = 30; // Sensibilidade de translação vetorial por tecla pressionada
    
    switch(e.key) {
        case "ArrowUp":    posY += step; break;
        case "ArrowDown":  posY -= step; break;
        case "ArrowLeft":  posX += step; break;
        case "ArrowRight": posX -= step; break;
        case "w": case "W": 
            if(zoom < 2) { zoom += 0.05; altitude += 2; } 
            break;
        case "s": case "S": 
            if(zoom > 0.5) { zoom -= 0.05; altitude -= 2; } 
            break;
    }
    updateFlight();
});

// Atualiza as posições de renderização do mapa de textura e o zoom computacional do feed
function updateFlight() {
    feed.style.backgroundPosition = `${posX}px ${posY}px`;
    feed.style.transform = `scale(${zoom})`;
    
    // Atualização de elementos textuais na tela do cockpit do HUD
    document.getElementById('alt').innerText = altitude + "m";
    document.getElementById('vel').innerText = "42km/h";
    document.getElementById('pos-x').innerText = Math.floor(posX);
    document.getElementById('pos-y').innerText = Math.floor(posY);
    
    // Filtro de amortecimento de velocidade (Volta a 0 km/h quando o input cessa)
    clearTimeout(window.velTimeout);
    window.velTimeout = setTimeout(() => {
        document.getElementById('vel').innerText = "0km/h";
    }, 300);
}

// Disparador do feixe de varredura do Deep Scan de Análise Agrícola
function toggleScan() {
    if (scanner.style.display === 'block') {
        scanner.style.display = 'none';
        results.style.display = 'none';
    } else {
        scanner.style.display = 'block';
        // Simula o tempo de processamento da rede neural de visão computacional
        setTimeout(() => {
            results.style.display = 'block';
        }, 1500);
    }
}

// Inicializador e Alternador do estado de liberação do pulverizador de insumos
function toggleSpray() {
    isSpraying = !isSpraying;
    if(isSpraying) {
        sprayBtn.innerText = "SISTEMA ATIVO";
        sprayBtn.classList.add('btn-active');
        document.getElementById('flight-status').innerText = "SPRAYING...";
        document.getElementById('flight-status').style.color = "#ff2581";
        startTankDrain();
    } else {
        sprayBtn.innerText = "Liberar Agrotóxico";
        sprayBtn.classList.remove('btn-active');
        document.getElementById('flight-status').innerText = "READY";
        document.getElementById('flight-status').style.color = "#00ff88";
    }
}

// Laço recursivo que processa o esvaziamento volumétrico do tanque de defensivos agrícolas
function startTankDrain() {
    if(isSpraying && tankLevel > 0) {
        tankLevel -= 1;
        tankDisplay.innerText = tankLevel + "%";
        setTimeout(startTankDrain, 500);
    } else if (tankLevel <= 0) {
        toggleSpray();
        sprayBtn.innerText = "TANQUE VAZIO";
        sprayBtn.disabled = true;
    }
}
