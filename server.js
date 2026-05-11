// Importa o módulo express
const express = require('express');
const path = require('path');
const app = express();
const porta = 3000;

// Configura o Node para servir arquivos estáticos (CSS, JS do jogo, imagens)
// Isso é vital para que o HTML consiga achar o "style.css" e "game.js"
app.use(express.static(__dirname));

// Rota principal: entrega o index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Inicia o servidor
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});