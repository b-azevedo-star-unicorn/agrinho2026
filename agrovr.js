// Seleção de nós DOM para efeito parallax e telemetria base
const fundoMundo = document.getElementById('bg');
const reticuloCursor = document.getElementById('cursor');
const monitorEixoX = document.getElementById('posx');
const monitorEixoY = document.getElementById('posy');

// Rastreamento angular do ponteiro do mouse e movimentação do canvas imersivo
document.addEventListener('mousemove', (event) => {
    const coordenadaX = event.clientX;
    const coordenadaY = event.clientY;

    // Atualização física e centralização do elemento indicador (Cursor Customizado)
    reticuloCursor.style.left = (coordenadaX - 12) + 'px';
    reticuloCursor.style.top = (coordenadaY - 12) + 'px';

    // Cálculo proporcional de translação inversa para o efeito Parallax 3D de fundo
    const deslocamentoX = (coordenadaX / window.innerWidth - 0.5) * 30;
    const deslocamentoY = (coordenadaY / window.innerHeight - 0.5) * 30;
    fundoMundo.style.transform = `translate(calc(-5% + ${-deslocamentoX}px), calc(-5% + ${-deslocamentoY}px))`;

    // Atualização de variáveis nos contadores de telemetria da tela do HUD
    monitorEixoX.innerText = Math.floor(coordenadaX);
    monitorEixoY.innerText = Math.floor(coordenadaY);
});

// Relógio do Sistema HUD baseado em tempo universal de execução local
setInterval(() => {
    document.getElementById('clock').innerText = new Date().toLocaleTimeString();
}, 1000);

// Função legado de sincronização neural (pode ser chamada sob demanda para validações)
function startSim(tipo) {
    alert(`Sincronizando interface neural para: ${tipo}.\n\nPor favor, aguarde o carregamento do ambiente imersivo.`);
}
