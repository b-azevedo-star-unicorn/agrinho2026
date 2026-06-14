let microscopeActive = false;
let currentSampleName = null; // Renomeado para evitar conflito com escopo global

// Fecha a janela de introdução pedagógica
function fecharAviso() { 
    document.getElementById('aviso-pedagogico').style.display = 'none'; 
}

// Controla a abertura e fechamento da galeria modal
function toggleGallery() {
    const gal = document.getElementById('gallery-overlay');
    gal.style.display = gal.style.display === 'flex' ? 'none' : 'flex';
}

// Gerencia a seleção da cultura na galeria
function selectSample(nome, cientifico, url) {
    currentSampleName = nome;
    document.getElementById('sample-img').src = url;
    document.getElementById('val-nome').innerText = cientifico;
    document.getElementById('log-display').innerHTML += `&gt; Amostra de ${nome} inserida.<br>`;
    
    // Auto scroll para o último comando do log
    const logBox = document.getElementById('log-display');
    logBox.scrollTop = logBox.scrollHeight;

    toggleGallery();
    document.getElementById('result-badge').style.display = "none";
}

// Ativa o zoom por simulação de lente de microscópio
function toggleMicroscope() {
    if (!currentSampleName) return alert("Erro: Nenhuma amostra detectada!");
    
    microscopeActive = !microscopeActive;
    const lens = document.getElementById('lens');
    const img = document.getElementById('sample-img');
    const btn = document.getElementById('micro-btn');
    
    lens.style.display = microscopeActive ? 'block' : 'none';
    img.style.transform = microscopeActive ? 'scale(2.8)' : 'scale(1)';
    btn.classList.toggle('active');
}

// Executa a simulação do escaneamento genético e molecular
function runAnalysis() {
    if (!currentSampleName) return alert("Erro: Inicie uma amostra para analisar!");
    
    const btn = document.getElementById('anal-btn');
    const scanLine = document.getElementById('scan-line');
    const status = document.getElementById('status-tag');
    
    btn.disabled = true;
    status.innerText = "ESCANEANDO...";
    status.style.color = "yellow";
    scanLine.style.display = "block";
    scanLine.style.animation = "scanning 2.5s linear infinite";

    setTimeout(() => {
        scanLine.style.display = "none";
        status.innerText = "CONCLUÍDO";
        status.style.color = "var(--bio-green)";
        
        // Atualização simulada de dados científicos no painel lateral
        document.getElementById('val-saude').innerText = "98.2% (SAUDÁVEL)";
        document.getElementById('val-hidra').innerText = "ÓTIMA";
        document.getElementById('val-defesa').innerText = "ESTÁVEL";
        document.getElementById('val-cresc').innerText = "FASE VEGETATIVA R2";
        
        document.getElementById('result-badge').style.display = "block";
        document.getElementById('veredito-text').innerText = `Análise molecular de ${currentSampleName} concluída com sucesso. Amostra com alto vigor genético.`;
        
        btn.disabled = false;
        alert("Protocolo de análise finalizado!");
    }, 3500);
}
