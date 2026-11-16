const request = require('supertest');
const criarApp = require('../src/app');

describe('API de tarefas', () => {
  let app;

  // Roda antes de CADA teste: cria um app novo, com a lista vazia,
  // pra um teste não interferir no outro.
  beforeEach(() => {
    app = criarApp();
  });

  test('GET /health responde ok', async () => {
    const resposta = await request(app).get('/health');

    expect(resposta.status).toBe(200);
    expect(resposta.body.status).toBe('ok');
  });

  test('POST /api/tarefas cria uma tarefa', async () => {
    const resposta = await request(app)
      .post('/api/tarefas')
      .send({ titulo: 'Estudar CI/CD' });

    expect(resposta.status).toBe(201);
    expect(resposta.body).toEqual({ id: 1, titulo: 'Estudar CI/CD', concluida: false });
  });

  test('POST /api/tarefas recusa título com menos de 3 caracteres', async () => {
    const resposta = await request(app)
      .post('/api/tarefas')
      .send({ titulo: 'x' });

    expect(resposta.status).toBe(400);
    expect(resposta.body.erro).toBe('O título precisa ter pelo menos 3 caracteres.');
  });

  test('GET /api/tarefas lista as tarefas criadas', async () => {
    await request(app).post('/api/tarefas').send({ titulo: 'Primeira tarefa' });
    await request(app).post('/api/tarefas').send({ titulo: 'Segunda tarefa' });

    const resposta = await request(app).get('/api/tarefas');

    expect(resposta.status).toBe(200);
    expect(resposta.body).toHaveLength(2);
  });
});