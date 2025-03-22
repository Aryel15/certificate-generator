const canvas = document.getElementById("certificadoCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 600;

let img = new Image();
img.src = "certificado.png";

let config = {
    textColor: "#3f3f3f",  // Cor padrão do texto
    textSize: "20",
    textFont: "Arial",
    textSizeTitle: "20",
    textFontTitle: "Arial"
};

img.onload = function() {
        preencherCertificado(400, 300, 400, 350);
};


document.getElementById("imagemFundo").addEventListener("change", function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

function quebrarTexto(ctx, texto, x, y, maxWidth, lineHeight) {
    console.log("Texto recebido para quebra:", texto);
    
    ctx.fillStyle = "red"; // Temporariamente para visualizar
    ctx.fillRect(x - 0, y - 0, 10, 10); // Desenha um ponto para ver onde está começando

    ctx.fillText(texto, x, y); // Apenas para verificar se o texto é escrito

    const palavras = texto.split(" ");
    let linha = "";
    let yAtual = y;

    for (let palavra of palavras) {
        let linhaTeste = linha + palavra + " ";
        let larguraTeste = ctx.measureText(linhaTeste).width;
        if (larguraTeste > maxWidth && linha !== "") {
            ctx.fillText(linha, x, yAtual);
            linha = palavra + " ";
            yAtual += lineHeight;
        } else {
            linha = linhaTeste;
        }
    }
    ctx.fillText(linha, x, yAtual);
}

function applySettings() {
    console.log('Aplicando configurações...');

    config.textColor = document.getElementById("textColor").value;
    config.textSize = document.getElementById("textSize").value;
    config.textFont = document.getElementById("textFont").value;
    config.textSizeTitle = document.getElementById("textSizeTitle").value;
    config.textFontTitle = document.getElementById("textFontTitle").value;

    // Obter as posições do texto
    const positionNameX = document.getElementById("positionNameX").value;
    const positionNameY = document.getElementById("positionNameY").value;
    const positionTextX = document.getElementById("positionTextX").value;
    const positionTextY = document.getElementById("positionTextY").value;

    // Chamar a função para preencher o certificado com as novas posições
    preencherCertificado(positionNameX, positionNameY, positionTextX, positionTextY);

    console.log(config);
    toggleSettings();
}

function preencherCertificado(positionNameX = 400, positionNameY = 300, positionTextX = 400, positionTextY = 350) {
    const nome = document.getElementById("nome").value || "________________";
    const curso = document.getElementById("curso").value || "________________";
    const instituicao = document.getElementById("instituicao").value || "________________";
    const formatarData = (data) => data ? new Date(data).toLocaleDateString("pt-BR") : "____/____/____";
    const inicio = formatarData(document.getElementById("inicio").value);
    const fim = formatarData(document.getElementById("fim").value);

    desenharCertificado(nome, curso, instituicao, inicio, fim, positionNameX, positionNameY, positionTextX, positionTextY);

    console.log(nome, curso, instituicao, inicio, fim, positionNameX, positionNameY, positionTextX, positionTextY);
    
}

function desenharCertificado(nome, curso, instituicao, inicio, fim, positionNameX, positionNameY, positionTextX, positionTextY) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = config.textColor;
    ctx.textAlign = "center";

    ctx.font = `${config.textSize}px ${config.textFont}`;
    ctx.fillText("Certificamos que", canvas.width / 2, 220);

    ctx.font = `bold ${config.textSizeTitle}px ${config.textFontTitle}`;
    ctx.fillText(nome, positionNameX, positionNameY);

    ctx.font = `${config.textSize}px ${config.textFont}`;
    const textoLongo = `Concluiu com aproveitamento o curso: ${curso}, oferecido pela/o ${instituicao}, no período de ${inicio} a ${fim}.`;
    quebrarTexto(ctx, textoLongo, positionTextX, positionTextY, 500, config.textSize + 5);
}


function baixarCertificado() {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "certificado.png";
    link.click();
}

function toggleSettings() {
    document.getElementById("settingsModal").classList.toggle("hidden");
}
