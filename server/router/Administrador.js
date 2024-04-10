const express = require("express");
const db = require('../database/database');
const router = express.Router();

router.post("/Administrador", (req, res) => {
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
          if (
            results.length > 0 ? results[0].length === 0 : results.length === 0
          ) {
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
        "select * from tblFuncionario where funIdAcad = ? and funNivel = ? order by funStatus desc",
        [idAcademia, data],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (
            results.length > 0 ? results[0].length === 0 : results.length === 0
          ) {
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
          if (
            results.length > 0 ? results[0].length === 0 : results.length === 0
          ) {
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
          if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
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
        "insert into tblCliente values (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ? ,? ,? ,? ,? ,? ,?)",
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
    case "VerificarCpfCadastrado":
      switch (data.modulo) {
        case "fun":
          db.query("select funCpf from tblFuncionario where funCpf = ?", [data.cpf], (err, results) => {
            if (err) {
              return res.json(err)
            }
            if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
              res.send(true)
            } else {
              res.send(false)
            }
          })
          break;
        case "cli":
          db.query("select cliCpf from tblCliente where cliCpf = ?", [data.cpf], (err, results) => {
            if (err) {
              return res.json(err)
            }
            if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
              res.send(true)
            } else {
              res.send(false)
            }
          })
          break;

      }
      break;
    case "VerificarEmailCadastrado":
      switch (data.modulo) {
        case "fun":
          db.query("select funEmail from tblFuncionario where funEmail = ?", [data.email], (err, results) => {
            if (err) {
              return res.json(err)
            }
            if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
              res.send(true)
            } else {
              res.send(false)
            }
          })
          break;
        case "cli":
          db.query("select cliEmail from tblCliente where cliEmail = ?", [data.email], (err, results) => {
            if (err) {
              return res.json(err)
            }
            if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
              res.send(true)
            } else {
              res.send(false)
            }
          })
          break;

      }
      break;
  }
});

module.exports = router;