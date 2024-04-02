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
      db.query(
        "select acaNome, acaDataCadastro, acaStatus, acaCelular from tblAcademia",
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
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
  const { acao, data, idAcademia } = req.body;

  switch (acao) {
    case "RegisterAtendimento":
      db.query(
        "insert into tblAtendimento values (default, ?, ?, ?, ?)",
        [data.cliId, data.funId, data.dateNow, idAcademia],
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

//ADMINISTRADOR

app.post("/Administrador", (req, res) => {
  const { acao, idAcademia, data } = req.body;
  switch (acao) {
    case "ReadClientes":
      db.query(
        "select * from tblCliente where cliIdAcad = ? order by cliStatus desc",
        [idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results[0].length === 0) {
            return res.json(false);
          }
          res.send(results);
        }
      );
      break;
    case "ReadClienteDet":
      db.query(
        "select * from tblCliente where cliId = ? and cliIdAcad = ? ",
        [data, idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results[0].length) {
            return res.json(false);
          }
          res.send(results[0]);
        }
      );
      break;
    case "ReadFuncionarios":
      db.query(
        "select * from tblFuncionario where funIdAcad = ? order by funStatus desc",
        [idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results[0].length === 0) {
            return res.json(false);
          }
          res.send(results);
        }
      );
      break;
    case "ReadFuncionarioDet":
      db.query(
        "select * from tblFuncionario where funId = ? and funIdAcad = ?",
        [data, idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results[0].length) {
            return res.json(false);
          }
          res.send(results[0]);
        }
      );
      break;
    case "ReadPlanos":
      db.query(
        "select * from tblPlanos where plaIdAcad = ?",
        [idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results[0].length === 0) {
            return res.json(false);
          }
          res.send(results);
        }
      );
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
    case "RegisterFuncionario":
      db.query(
        "insert into tblFuncionario values (default, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          data.funNome,
          data.funCelular,
          data.funCep,
          data.funCidade,
          data.funEstado,
          data.funRua,
          data.funNumeroRua,
          data.funSexo,
          data.funCpf,
          data.funEmail,
          data.funDataCmc,
          1,
          idAcademia,
          data.funSenha,
          1,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "RegisterCliente":
      db.query(
        "insert into tblCliente values (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,? ,?)",
        [
          data.cliNome,
          data.cliCelular,
          data.cliCep,
          data.cliCidade,
          data.cliEstado,
          data.cliRua,
          data.cliNumeroRua,
          data.cliSexo,
          data.cliCpf,
          data.cliEmail,
          data.cliDataCmc,
          1,
          data.cliPlano,
          idAcademia,
          data.cliSenha,
          null,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "RegisterPlanos":
      break;
    case "ArchiveCliente":
      db.query(
        "update tblCliente set cliStatus = ? where cliId = ?",
        [0, data],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "ArchiveFuncionario":
      db.query(
        "update tblFuncionario set funStatus = ? where funId = ?",
        [0, data],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "AddAdministrador":
      break;
    case "RegisterAvaliacaoSistema":
      break;
    case "ArchivePlanos":
      break;
    case "UpdatePlanos":
      break;
    case "UpdateFuncionarioDetalhes":
      db.query(
        "update tblFuncionario set funNome = ?, funCelular = ?, funCep = ?, funCidade = ?, funEstado = ?, funRua = ?, funNumeroRua = ?, funSexo = ?, funCpf = ?, funEmail = ?, funDataCmc = ?, funStatus = ?, funNivel = ? where funId = ?",
        [
          data.funNome,
          data.funCelular,
          data.funCep,
          data.funCidade,
          data.funEstado,
          data.funRua,
          data.funNumeroRua,
          data.funSexo,
          data.funCpf,
          data.funEmail,
          data.funDataCmc,
          data.funStatus,
          data.funNivel,
          data.funId,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "UpdateClienteDetalhes":
      db.query(
        "update tblCliente set cliNome = ?, cliCelular = ?, cliCep = ?, cliCidade = ?, cliEstado = ?, cliRua = ?, cliNumeroRua = ?, cliSexo = ?, cliCpf = ?, cliEmail = ?, cliDataCmc = ?, cliStatus = ?, cliPlano = ? where cliId = ?",
        [
          data.cliNome,
          data.cliCelular,
          data.cliCep,
          data.cliCidade,
          data.cliEstado,
          data.cliRua,
          data.cliNumeroRua,
          data.cliSexo,
          data.cliCpf,
          data.cliEmail,
          data.cliDataCmc,
          data.cliStatus,
          data.cliPlano,
          data.cliId,
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

//FICHA

app.post("/Ficha", (req, res) => {
  const { acao, data, idAcademia } = req.body;
  switch (acao) {
    case "ReadFicha":
      db.query(
        "select * from tblFicha where ficIdCliente = ? and ficIdAcademia = ?",
        [data.cliId, idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results[0].length === 0) {
            return res.json(false);
          }
          const DadosFicha = results[0];
          db.query(
            "select * tblFichaDetalhes where detIdFicha = ?",
            [DadosFicha.ficId],
            (err, result) => {
              if (err) {
                return res.json(err);
              }
              if (result[0].length) {
                return res.json(false);
              }
              const DadosFichaDetalhes = result[0];
              res.send(DadosFichaDetalhes);
            }
          );
        }
      );
      break;
    case "ReadLastFicha":
      db.query(
        "SELECT * FROM tblFicha ORDER BY ficId DESC LIMIT 1",
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "RegisterFicha":
      db.query(
        "insert into tblFicha values (default, ?, ?, ?)",
        [data.cliId, data.funId, idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "RegisterDetalhesFicha":
      db.query(
        "insert into tblFichaDetalhes values (default, ?, ?, ?, ?, ?, ?)",
        [
          data.apaId,
          data.detVariacao,
          data.detCarga,
          data.detSerie,
          data.detRepeticao,
          data.lastFicha,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "UpdateDetalhesFicha":
      db.query(
        "update tblFichaDetalhes set detIdAparelho = ?, detVariacao = ?, detCarga = ?, detSerie = ?, detRepeticao = ? where detId = ?",
        [
          data.apaId,
          data.detVariacao,
          data.detCarga,
          data.detSerie,
          data.detRepeticao,
          data.detId,
        ]
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
