const canvas = document.getElementById('meuJogo');
const ctx = canvas.getContext('2d');
const btnStart = document.getElementById('btnStart');

let jogoAtivo = false;
let pontuacao = 0;
let inimigos = [];
let projeteis = [];
let particulas = [];

class Jogador {
    constructor() {
        this.largura = 40;
        this.altura = 40;
        this.x = canvas.width / 2 - 20;
        this.y = canvas.height - 60;
        this.cor = "#e94560";
    }

    desenhar() {
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.cor;
        ctx.fillStyle = this.cor;
        ctx.beginPath();
        ctx.moveTo(this.x + this.largura / 2, this.y);
        ctx.lineTo(this.x, this.y + this.altura);
        ctx.lineTo(this.x + this.largura, this.y + this.altura);
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

class Inimigo {
    constructor() {
        this.raio = Math.random() * 15 + 10;
        this.x = Math.random() * (canvas.width - this.raio * 2) + this.raio;
        this.y = -this.raio;
        this.velocidadeY = Math.random() * 1.5 + 1;
        this.amplitude = Math.random() * 2;
        this.tempo = 0;
    }

    atualizar() {
        this.y += this.velocidadeY;
        this.x += Math.sin(this.tempo) * this.amplitude;
        this.tempo += 0.05;
    }

    desenhar() {
        ctx.fillStyle = "#4ecca3";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Projetil {
    constructor(x, y, alvoX, alvoY) {
        this.x = x;
        this.y = y;
        this.raio = 4;
        this.cor = "#ffffff";
        
        const angulo = Math.atan2(alvoY - y, alvoX - x);
        this.velocidadeX = Math.cos(angulo) * 6;
        this.velocidadeY = Math.sin(angulo) * 6;
    }

    atualizar() {
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    }

    desenhar() {
        ctx.fillStyle = this.cor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.raio, 0, Math.PI * 2);
        ctx.fill();
    }
}

const player = new Jogador();

function spawnInimigos() {
    if (!jogoAtivo) return;
    inimigos.push(new Inimigo());
    let proximoSpawn = Math.max(300, 1000 - pontuacao * 2);
    setTimeout(spawnInimigos, proximoSpawn);
}

function detectarColisao(obj1, obj2) {
    const dist = Math.hypot(obj1.x - obj2.x, obj1.y - obj2.y);
    return dist < (obj1.raio || 20) + (obj2.raio || 20);
}

function handleInput(event) {
    if (!jogoAtivo) return;
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    projeteis.push(new Projetil(player.x + 20, player.y, mouseX, mouseY));
}

function gameLoop() {
    if (!jogoAtivo) return;

    ctx.fillStyle = "rgba(26, 26, 46, 0.3)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    player.desenhar();

    projeteis.forEach((p, index) => {
        p.atualizar();
        p.desenhar();
        if (p.x < 0 || p.x > canvas.width || p.y < 0) {
            projeteis.splice(index, 1);
        }
    });

    inimigos.forEach((inimigo, iIndex) => {
        inimigo.atualizar();
        inimigo.desenhar();

        if (inimigo.y > canvas.height) {
            finalizarJogo();
        }

        projeteis.forEach((p, pIndex) => {
            if (detectarColisao(p, inimigo)) {
                inimigos.splice(iIndex, 1);
                projeteis.splice(pIndex, 1);
                pontuacao += 10;
            }
        });
    });

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Pontos: ${pontuacao}`, 20, 30);

    requestAnimationFrame(gameLoop);
}

function iniciarJogo() {
    jogoAtivo = true;
    pontuacao = 0;
    inimigos = [];
    projeteis = [];
    btnStart.classList.add('hidden');
    spawnInimigos();
    gameLoop();
}

function finalizarJogo() {
    jogoAtivo = false;
    alert(`Fim de Jogo! Sua pontuação final: ${pontuacao}`);
    btnStart.classList.remove('hidden');
}

canvas.addEventListener('mousedown', handleInput);
btnStart.addEventListener('click', iniciarJogo);