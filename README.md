# API do Metrô de São Paulo

## Visão Geral

Este projeto é uma API construída com Node.js e Express para fornecer informações sobre o status das linhas de metrô em São Paulo, disponível em https://api-metro-sp.onrender.com/.

 A primeira requisição pode demorar para ser respondida devido a politicas do Render.

## Endpoints

### Obter Todas as Linhas

- **Endpoint:** /
- **Método:** GET
- **Descrição:** Obter o status de todas as linhas de metrô.

### Obter Uma Linha

- **Endpoint:** /linha/:id
- **Método:** GET
- **Descrição:** Obter o status de uma linha de metrô específica.
- **Parâmetros:**
  - `id`: O ID ou número da linha de metrô.
