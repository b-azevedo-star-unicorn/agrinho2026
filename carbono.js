function calcular() {
    const hectares = document.getElementById('ha').value || 0;
    const absorcao = document.getElementById('bioma').value;
    const precoDolar = document.getElementById('preco').value || 0;
    const cotacaoDolar = 5.25;

    const toneladasTotal = hectares * absorcao;
    const ganhoReal = toneladasTotal * precoDolar * cotacaoDolar;

    const elementoTotal = document.getElementById('total');
    const valorFormatado = ganhoReal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    elementoTotal.innerText = valorFormatado;
    document.getElementById('co2').innerText = toneladasTotal.toLocaleString('pt-BR') + ' t/ano';

    // Lógica do Impacto Ambiental
    const statusImpacto = document.getElementById('impacto-status');
    if (toneladasTotal > 0) {
        statusImpacto.innerText = "POSITIVO";
        statusImpacto.style.color = "var(--secondary)";
    } else {
        statusImpacto.innerText = "NEUTRO";
        statusImpacto.style.color = "#999";
    }

    ajustarFonte(elementoTotal);
}

function ajustarFonte(elemento) {
    let fontSize = 3.5; 
    elemento.style.fontSize = fontSize + "rem";

    // Reduz a fonte se o número for muito grande para a largura do quadro
    while (elemento.offsetWidth > 260 && fontSize > 1) {
        fontSize -= 0.2;
        elemento.style.fontSize = fontSize + "rem";
    }
}
