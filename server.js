const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'sua_base'
});
// Salvar ordem de serviço
app.post('/api/ordem', (req, res) => {
    const { ordemId, cliente, emissao, entrega, itens } = req.body;
    db.query(
        'INSERT INTO ordens (ordemId, cliente, emissao, entrega, itens) VALUES (?, ?, ?, ?, ?)',
        [ordemId, cliente, emissao, entrega, JSON.stringify(itens)],
        (err) => {
            if (err) return res.json({ success: false });
            res.json({ success: true });
        }
    );
});
// Consultar ordem de serviço pelo ID (usando o QR Code)
app.get('/api/ordem/:id', (req, res) => {
    db.query(
        'SELECT * FROM ordens WHERE ordemId = ?',
        [req.params.id],
        (err, results) => {
            if (err || results.length === 0) return res.json({ success: false });
            res.json({ success: true, ordem: results[0] });
        }
    );
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));