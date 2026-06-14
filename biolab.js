const db = {
    percevejo: { n: "Percevejo", a: "Telenomus podisi", e: 85 },
    ferrugem: { n: "Ferrugem", a: "Bacillus pumilus", e: 78 },
    lagarta: { n: "Lagarta", a: "Baculovirus spodoptera", e: 95 },
    cigarrinha: { n: "Cigarrinha", a: "Beauveria bassiana", e: 82 },
    broca: { n: "Broca do Café", a: "Beauveria bassiana", e: 80 },
    bicho_mineiro: { n: "Bicho Mineiro", a: "Vespa Predadora", e: 88 },
    broca_cana: { n: "Broca da Cana", a: "Cotesia flavipes", e: 92 },
    nematoide: { n: "Nematoide", a: "Paecilomyces lilacinus", e: 75 },
    mosca_branca: { n: "Mosca Branca", a: "Cordyceps fumosorosea", e: 90 }
};

function analisar() {
    const pragaKey = document.getElementById('praga').value;
    const dados = db[pragaKey];

    const elNome = document.getElementById('nome-alvo');
    const elAgente = document.getElementById('agente-nome');
    const elEficTxt = document.getElementById('eficacia-txt');
    const elBar = document.getElementById('bar-fill');

    // Atualiza textos
    elNome.innerText = dados.n.toUpperCase();
    elAgente.innerText = dados.a;
    elEficTxt.innerText = dados.e + "%";
    elBar.style.width = dados.e + "%";

    // Lógica de diminuir fonte caso o nome seja muito longo
    ajustarFonte(elNome, 3.5);
    ajustarFonte(elAgente, 1.8);
}

function ajustarFonte(el, max) {
    let size = max;
    el.style.fontSize = size + "rem";
    const limite = el.parentElement.offsetWidth - 20;

    while (el.offsetWidth > limite && size > 1) {
        size -= 0.1;
        el.style.fontSize = size + "rem";
    }
}

// Inicializa a análise ao carregar a página
analisar();
