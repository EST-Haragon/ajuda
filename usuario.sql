CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  senha VARCHAR(255),
  setor ENUM('recepcao', 'foto', 'producao', 'controle', 'expedicao', 'gerente'),
  pode_editar BOOLEAN DEFAULT FALSE,
  pode_excluir BOOLEAN DEFAULT FALSE,
  acesso_clientes BOOLEAN DEFAULT FALSE
);