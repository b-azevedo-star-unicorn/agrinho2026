// Calcula e projeta a valorização decendial dos ativos rurais com base nas variáveis do formulário
function projetar() {
    // Coleta as entradas numéricas prevenindo falhas de digitação vazias (fallback para zero)
    const vHa = parseFloat(document.getElementById('val_ha').value) || 0;
    const tHa = parseFloat(document.getElementById('total_ha').value) || 0;
    const mult = parseFloat(document.getElementById('tech').value);

    // Cálculos de progressão geométrica por ciclos decendiais (Anotações financeiras)
    const atual = vHa * tHa;
    const dec1 = atual * mult;
    const dec2 = dec1 * mult;

    // Atualiza os valores flutuantes sobre as colunas gráficas representativas (Em Milhões de Reais)
    document.getElementById('v1').innerText = "R$ " + (atual / 1000000).toFixed(1) + "M";
    document.getElementById('v2').innerText = "R$ " + (dec1 / 1000000).toFixed(1) + "M";
    document.getElementById('v3').innerText = "R$ " + (dec2 / 1000000).toFixed(1) + "M";

    // Altera dinamicamente as proporções de altura das barras no CSS Grid/Flexbox
    document.getElementById('b1').style.height = "30%";
    document.getElementById('b2').style.height = (30 * mult) + "%";
    document.getElementById('b3').style.height = (30 * mult * mult) + "%";

    // Formatação internacionalizada para Moeda Brasileira (R$ BRL) no painel de herança final
    const elementoFinal = document.getElementById('v_final');
    elementoFinal.innerText = dec2.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    // Dispara a segurança responsiva de compressão tipográfica
    ajustarFonte(elementoFinal);
}

// Mecanismo inteligente para reduzir a fonte caso o capital passe das casas dos milhões/bilhões
function ajustarFonte(el) {
    let size = 2.2; // Escala inicial em rem
    el.style.fontSize = size + "rem";
    
    // Captura o contêiner estrutural limitante para evitar estolamento visual externo
    const limite = el.parentElement.offsetWidth - 20;

    // Encolhe gradativamente até atingir a margem de segurança física
    while (el.offsetWidth > limite && size > 0.8) {
        size -= 0.1;
        el.style.fontSize = size + "rem";
    }
}

// Dispara automaticamente a inicialização de dados na primeira carga de página do relatório
document.addEventListener("DOMContentLoaded", () => {
    projetar();
});
