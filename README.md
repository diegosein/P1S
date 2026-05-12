# Star Runner - Projeto de Full Stack

Este projeto consiste em uma aplicação web completa contendo um jogo interativo de agilidade espacial desenvolvido em JavaScript Canvas, um servidor backend em Node.js e páginas informativas estruturadas em HTML5/CSS3.

# Roteiro do Projeto

# 1. O Conceito (Originalidade)
Para atender aos requisitos de complexidade da disciplina e evitar mecânicas simples , o Star Runner foca em reflexos rápidos e cálculos de trajetória em tempo real.

- Mecânica Central: O jogador controla uma nave de interceptação que deve neutralizar ameaças espaciais através de disparos direcionados pela posição do mouse.
- Desafio Matemático: Os inimigos utilizam uma função senoidal ($Math.sin()$) em sua lógica de movimentação, criando um efeito de "ziguezague" oscilatório que exige que o jogador calcule o tempo de deslocamento do projétil.
- Dificuldade Progressiva: O jogo implementa um sistema de aceleração; conforme a pontuação sobe, a velocidade dos objetos aumenta, exigindo maior agilidade do "Star Runner".

# 2. Estrutura Técnica
O projeto foi organizado para garantir a máxima pontuação nos critérios de organização do JavaScript:

* Frontend (Interface): 3 páginas HTML (Home, Jogo e Desenvolvedores) conectadas por um menu de navegação global e estilizadas via CSS externo.
* Motor do Jogo (game.js): Arquitetura baseada em Programação Orientada a Objetos (POO). O uso de classes para `Jogador`, `Inimigo` e `Projetil` permite uma gestão de memória eficiente e código limpo.
* Backend (server.js): Servidor em Node.js com framework Express, garantindo que o roteamento entre as páginas e o carregamento dos assets do Canvas funcionem sem restrições de segurança do navegador.

# 3. Lógica de Desenvolvimento e IA
Em conformidade com as normas de transparência da disciplina, o uso de IA foi aplicado como suporte técnico:
- Estruturação: Auxílio na arquitetura das classes JavaScript e no loop principal de animação, além também da base de POO.
- Geometria Analítica: Implementação da função $Math.atan2(y, x)$ para converter a diferença de coordenadas entre a nave e o clique do mouse em vetores de velocidade precisos.
