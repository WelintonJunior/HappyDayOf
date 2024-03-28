const mysql = require("mysql2");
const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "2206",
  database: "happyday2",
});

db.getConnection((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexao estabelecida");
});

app.use(cors());
app.use(bodyParser.json());

//Equipe

app.post("/Equipe", (req, res) => {
  const { acao, data } = req.body;

  const cnpj = data.acaCnpj;
  const nome = data.acaNome;
  const date = data.acaDataCadastro;
  // const status = data.acaStatus;
  const celular = data.acaCelular;
  const cep = data.acaCep;

  switch (acao) {
    case "CreateAcademia":
      db.query(
        "insert into tblAcademia values (DEFAULT,?,?,?,?,?,?)",
        [cnpj, nome, date, 1, celular, cep],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "ReadAcademia":
      break;
    case "UpdateAcademia":
      break;
    case "DeleteAcademia":
      break;
  }
});

//CLIENTE

app.post("/Cliente", (req, res) => {
  const { acao, idAcademia } = req.body;

  switch (acao) {
    case "UpdateCliente":
      break;
    case "ReadCliente":
      break;
    case "RegisterAvaliacaoProfessor":
      break;
  }
});

//FUNCIONARIO

app.post("/Funcionario", (req, res) => {
  const { acao, idAcademia } = req.body;

  switch (acao) {
    case "RegisterAtendimento":
      break;
  }
});

//ADMINISTRADOR

app.post("/Administrador", (req, res) => {
  const { acao, idAcademia } = req.body;
  switch (acao) {
    case "ReadFicha":
      break;
    case "ReadClientes":
      break;
    case "ReadClienteDet":
      break;
    case "ReadFuncionarios":
      break;
    case "ReadFuncionarioDet":
      break;
    case "RegisterFuncionario":
      break;
    case "RegisterFicha":
      break;
    case "RegisterCliente":
      break;
    case "ArchiveCliente":
      break;
    case "ArchiveFuncionario":
      break;
    case "AddAdministrador":
      break;
    case "RegisterAvaliacaoSistema":
      break;
  }
});

//DASHBOARD

app.post("/Dashboard", (req, res) => {
  const { acao, idAcademia } = req.body;

  switch (acao) {
    case "TaxaAdocao":
      break;
    case "Satisfacao":
      break;
    case "ProdutividadeProfessores":
      break;
    case "EngajamentoAlunos":
      break;
    case "AvaliacaoPerformance":
      break;
    case "Roi":
      break;
  }
});

//LOGIN

app.post("/Login", (req, res) => {
  const { acao, data } = req.body;
  const email = data.email;
  const senha = data.senha;
  const nivel = data.userType;
  switch (acao) {
    case "LoginCliente":
      db.query(
        "select * from tblCliente where cliEmail = ?",
        [email],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results.length === 0) {
            return res.json(false);
          }
          if (results[0].cliSenha === senha) {
            res.json(results[0]);
          } else {
            res.json(false);
          }
        }
      );
      break;
    case "LoginFuncionario":
      db.query(
        "select * from tblFuncionario where funEmail = ?",
        [email],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results.length === 0) {
            return res.json(false);
          }
          if (results[0].funSenha === senha) {
            res.send(results[0]);
          } else {
            res.send(false);
          }
        }
      );
      break;
  }
});

app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
