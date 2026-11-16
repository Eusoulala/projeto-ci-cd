const express = require('express');

// Cada chamada de criarApp() monta um app novo, com a lista vazia.

function criarApp() {
  const app = express();
  app.use(express.json()); // permite ler JSON no corpo das requisições (eu acho)

  const tarefas = [];
  let proximoId = 1;

  app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
  });

  app.get('/api/tarefas', (req, res) => {
    res.json(tarefas);
  });

  app.post('/api/tarefas', (req, res) => {
    const titulo = req.body?.titulo;

    if (typeof titulo !== 'string' || titulo.trim().length < 1) {
      return res.status(400).json({ erro: 'O título precisa ter pelo menos 3 caracteres.' });
    }

    const tarefa = { id: proximoId++, titulo: titulo.trim(), concluida: false };
    tarefas.push(tarefa);
    res.status(201).json(tarefa);
  });

  return app;
}

module.exports = criarApp;