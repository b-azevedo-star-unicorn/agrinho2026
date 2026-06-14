// Atualização contínua do relógio na barra de status
setInterval(() => { 
    document.getElementById('clock').innerText = new Date().toLocaleTimeString(); 
}, 1000);

function prever(cenario) {
    // Mapeamento dos elementos estruturais da interface
    const el = {
        temp: document.getElementById('main-temp'), 
        icon: document.getElementById('main-icon'), 
        desc: document.getElementById('weather-desc'),
        rad: document.getElementById('val-rad'), 
        vento: document.getElementById('val-vento'), 
        umid: document.getElementById('val-umid'),
        pres: document.getElementById('val-pres'), 
        dt: document.getElementById('val-dt'), 
        probB: document.getElementById('prob-bar'),
        probV: document.getElementById('prob-val'), 
        advice: document.getElementById('ia-advice'), 
        water: document.getElementById('ia-water'),
        impact: document.getElementById('impact-txt'), 
        msg: document.getElementById('radar-msg'), 
        dot: document.getElementById('dot'),
        waterCard: document.getElementById('status-irrig')
    };

    if (cenario === 'chuva') {
        document.body.style.background = "#0a0f1a";
        el.temp.innerText = "18°C"; 
        el.icon.innerText = "⛈️"; 
        el.desc.innerText = "FRENTE FRIA"; 
        el.desc.style.color = "#7209b7";
        
        el.rad.innerText = "120 W/m²"; 
        el.vento.innerText = "52 km/h"; 
        el.umid.innerText = "92%"; 
        el.pres.innerText = "998 hPa"; 
        el.dt.innerText = "1.2";
        
        el.probB.style.width = "95%"; 
        el.probV.innerText = "95%"; 
        el.msg.innerText = "ALERTA: FRENTE FRIA EM DESLOCAMENTO"; 
        el.dot.style.background = "#7209b7";
        
        el.advice.innerText = "⚠️ Ventos fortes! Abortar pulverização e proteger mudas jovens."; 
        el.water.innerText = "🛑 Irrigação suspensa por excesso de umidade prevista.";
        el.waterCard.style.borderColor = "#7209b7";
        el.impact.innerText = "IMPACTOS: EROSÃO POTENCIAL // SATURAÇÃO DO SOLO // QUEDA DE LUMINOSIDADE";

    } else if (cenario === 'seca') {
        document.body.style.background = "#240a05";
        el.temp.innerText = "38°C"; 
        el.icon.innerText = "🔥"; 
        el.desc.innerText = "CALOR EXTREMO"; 
        el.desc.style.color = "var(--heat)";
        
        el.rad.innerText = "1100 W/m²"; 
        el.vento.innerText = "6 km/h"; 
        el.umid.innerText = "14%"; 
        el.pres.innerText = "1018 hPa"; 
        el.dt.innerText = "8.5";
        
        el.probB.style.width = "0%"; 
        el.probV.innerText = "0%"; 
        el.msg.innerText = "ALERTA: ESTRESSE TÉRMICO NÍVEL 3"; 
        el.dot.style.background = "var(--heat)";
        
        el.advice.innerText = "🚨 Calor crítico! Aplicar bioestimulantes contra estresse térmico."; 
        el.water.innerText = "⚡ Ativar AquaGuard máximo para manter turgidez das plantas.";
        el.waterCard.style.borderColor = "var(--heat)";
        el.impact.innerText = "IMPACTOS: ALTA EVAPOTRANSPIRAÇÃO // DÉFICIT DE PRESSÃO DE VAPOR // RISCO DE QUEIMADAS";

    } else {
        // Estado Normal / Padrão
        document.body.style.background = "#050505";
        el.temp.innerText = "24°C"; 
        el.icon.innerText = "☀️"; 
        el.desc.innerText = "CÉU LIMPO"; 
        el.desc.style.color = "var(--sky)";
        
        el.rad.innerText = "780 W/m²"; 
        el.vento.innerText = "12 km/h"; 
        el.umid.innerText = "58%"; 
        el.pres.innerText = "1014 hPa"; 
        el.dt.innerText = "4.2";
        
        el.probB.style.width = "5%"; 
        el.probV.innerText = "5%"; 
        el.msg.innerText = "SISTEMA PREDITIVO ATIVO // SATÉLITE GOES-16 OK"; 
        el.dot.style.background = "var(--safe)";
        
        el.advice.innerText = "Janela ideal para semeadura e manejo."; 
        el.water.innerText = "Irrigação liberada. Níveis normais.";
        el.waterCard.style.borderColor = "var(--safe)";
        el.impact.innerText = "IMPACTOS: ESTABILIDADE CLIMÁTICA // RISCO DE GEADA: NULO // EVAPOTRANSPIRAÇÃO: NORMAL";
    }
}
