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

  switch (acao) {
    case "CreateAcademia":
      db.query(
        "insert into tblAcademia values (DEFAULT,?,?,?,?,?,?,?,?)",
        [
          data.acaCnpj,
          data.acaNome,
          data.acaDataCadastro,
          1,
          data.acaCelular,
          data.acaCep,
          data.acaColor,
          data.acaTelefone,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "ReadAcademia":
      db.query("select * from tblAcademia", (err, results) => {
        if (err) {
          return res.json(err);
        }
        res.send(results);
      });
      break;
    case "ReadAcademiaLista":
      db.query("select acaNome, acaDataCadastro, acaStatus, acaCelular from tblAcademia", (err, results) => {
        if (err) {
          return res.json(err);
        }
        res.send(results);
      });
      break;
    case "ReadLastAcademia":
      db.query(
        "SELECT * FROM tblAcademia ORDER BY acaId DESC LIMIT 1",
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "UpdateAcademia":
      break;
    case "DeleteAcademia":
      break;
    case "AddAdministrador":
      db.query(
        "insert into tblFuncionario values(DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, ?, 2)",
        [
          data.admNome,
          data.admCelular,
          data.admCep,
          data.admCidade,
          data.admEstado,
          data.admRua,
          data.admNumeroRua,
          data.admSexo,
          data.admCpf,
          data.admEmail,
          data.admDataCmc,
          data.admAcademia,
          data.admSenha,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
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
    case "ReadAcademia":
      db.query(
        "select * from tblAcademia where acaId = ?",
        [idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results[0].length === 0) {
            return res.json(false);
          }
          res.send(results[0]);
        }
      );
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
