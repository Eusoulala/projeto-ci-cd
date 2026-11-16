const criarApp = require('./app');

// O Render define a porta pela variável PORT; no Mac, usa a 3000.
const PORTA = process.env.PORT || 3000;

criarApp().listen(PORTA, () => {
  console.log(`Servidor rodando em http://localhost:${PORTA}`);
});