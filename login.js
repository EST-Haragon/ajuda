const express = require('express');
const session = require('express-session');
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'sua_chave_secreta',
  resave: false,
  saveUninitialized: true
}));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'galvanica'
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  db.query('SELECT * FROM usuarios WHERE email = ?', [email], (err, results) => {
    if (results.length === 0) return res.status(401).send('Usuário não encontrado');
    const user = results[0];
    bcrypt.compare(senha, user.senha, (err, match) => {
      if (!match) return res.status(401).send('Senha incorreta');
      req.session.usuario = user;
      res.send('Login ok');
    });
  });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));