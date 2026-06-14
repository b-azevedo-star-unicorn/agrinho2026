function registrar() {
    // Captura dos dados inseridos pelo usuário no formulário
    const prod = document.getElementById('prod').value;
    const car = document.getElementById('car').value || "GERAL";
    const lote = document.getElementById('lote').value;

    // Elementos de controle da interface visual
    const loader = document.getElementById('loader');
    const msgExito = document.getElementById('msg');
    const displayHash = document.getElementById('hash-display');
    const caixaQR = document.querySelector('.qr-box');

    // Inicializa os estados da animação de criptografia
    loader.style.display = 'flex';
    msgExito.style.display = 'none';

    // Simula de forma síncrona o delay de validação dos blocos da rede descentralizada (2 segundos)
    setTimeout(() => {
        // Encerra a interface de carregamento do loader
        loader.style.display = 'none';
        
        // Ativa a notificação de sucesso imutável
        msgExito.style.display = 'block';

        // Gera strings aleatórias simulando chaves públicas criptográficas reais
        const randomHash = Math.random().toString(36).substring(2, 10).toUpperCase();
        const hashFinal = `BC-${prod.substring(0,3)}-${lote}-${randomHash}`;
        
        // Define o texto gerado na tela do usuário
        displayHash.innerText = hashFinal;

        // Dispara o algoritmo de segurança para redimensionar a fonte
        ajustarFonte(displayHash);
        
        // Altera a identidade visual do QR Code para o tom de validação ecológica
        caixaQR.style.borderColor = '#06d6a0';
    }, 2000);
}

// Algoritmo dinâmico para impedir vazamento ou quebra de layout por strings de hash extensas
function ajustarFonte(el) {
    let size = 1.2;
    el.style.fontSize = size + "rem";
    
    // Diminui o rem gradativamente enquanto o elemento ultrapassar a largura segura de empacotamento
    while (el.offsetWidth > 250 && size > 0.6) {
        size -= 0.1;
        el.style.fontSize = size + "rem";
    }
}
