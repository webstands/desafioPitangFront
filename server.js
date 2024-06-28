const express = require('express');
const path = require('path');
const app = express();

// Caminho para os arquivos estáticos do build do Angular
app.use(express.static(path.join(__dirname, 'dist/user-car-front')));

// Rota para a aplicação Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/user-car-front/index.html'));
});

// Iniciar o servidor na porta 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
