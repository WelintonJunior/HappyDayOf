const express = require("express");
const db = require("../database/database")
const router = express.Router();
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../app.js")

router.post("/Cliente", (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Token de autorização ausente' });
  }
  jwt.verify(token, jwtSecret, async (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Sessão expirada, faça login novamente" });
    } else {
      const { acao, idAcademia, data } = req.body;
      switch (acao) {
        case "UpdateCliente":
          break;
        case "ReadCliente":
          break;
        case "RegisterAvaliacaoProfessor":
          break;
        case "ReadStatusAtendimento":
          db.query("select ateStatus from tblAtendimento where ateIdCliente = ? and ateDateInicio <= ? and ateDateEncerramento is null and ateIdAcad = ?",
            [data.cliId, data.dateNow, idAcademia], (err, results) => {
              if (err) {
                res.json(err)
              }
              if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
                res.send(false)
              } else {
                res.send(true)
              }
            })
          break;
        case "VerifySatisfacaoAtendimento":
          db.query("select satStatus from tblSatisfacao where satIdCliente = ? and satIdAcademia = ? and satStatus = 0",
            [data.cliId, idAcademia], (err, results) => {
              if (err) {
                res.json(err)
              }
              if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
                return res.json(false)
              }
              res.send(results)
            })
          break;
        case "VerificarAtendimento":
          db.query("select * from tblSatisfacao where satIdCliente = ? and satIdAcademia = ? and satStatus = 0",
            [data.cliId, idAcademia], (err, results) => {
              if (err) {
                res.json(err)
              }
              if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
                return res.json(false)
              }
              res.send(results)
            })
          break;
        case "ReadAtendimentoInfo":
          db.query("select * from tblAtendimento where ateId = ?",
            [data.ateId], (err, results) => {
              if (err) {
                res.json(err)
              }
              if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
                return res.json(false)
              }
              res.send(results)
            })
          break;
        case "UpdateSatisfacao":
          switch (data.modulo) {
            case "Conhecimento":
              db.query("update tblSatisfacao set satNotaConhecimento = ? where satId = ?",
                [data.rating, data.satId], (err, results) => {
                  if (err) {
                    res.json(err)
                  }
                  res.send(results)
                })
              break;
            case "Clareza":
              db.query("update tblSatisfacao set satNotaClareza = ? where satId = ?",
                [data.rating, data.satId], (err, results) => {
                  if (err) {
                    res.json(err)
                  }
                  res.send(results)

                })
              break;
            case "Pró Atividade":
              db.query("update tblSatisfacao set satNotaProatividade = ? where satId = ?",
                [data.rating, data.satId], (err, results) => {
                  if (err) {
                    res.json(err)
                  }
                  res.send(results)

                })
              break;
            case "Disponibilidade":
              db.query("update tblSatisfacao set satNotaDisponibilidade = ? where satId = ?",
                [data.rating, data.satId], (err, results) => {
                  if (err) {
                    res.json(err)
                  }
                  res.send(results)

                })
              break;
            case "Segurança":
              db.query("update tblSatisfacao set satNotaSeguranca = ?, satStatus = 1 where satId = ?",
                [data.rating, data.satId], (err, results) => {
                  if (err) {
                    res.json(err)
                  }
                  res.send(results)

                })
              break;
          }
          break;
        case "ReadDesempenho":
          db.query("select * from tblDesempenho where desIdCliente = ? order by desData",
            [data], (err, results) => {
              if (err) {
                res.json(err)
              }
              if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
                return res.json(false)
              }
              res.send(results)
            })
          break;
        case "ReadMeta":
          db.query("select * from tblMeta where metIdCliente = ? and metStatus = 1", [data], (err, results) => {
            if (err) {
              return res.json(err)
            }
            if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
              return res.json(false)
            }
            res.send(results)
          })
          break;
        case "RegisterMeta":
          db.query("insert into tblMeta values (default, ?, ?, ?, ?, 1, 0, ?)", [data.cliId, parseInt(data.metaGordura), parseInt(data.metaPeso), data.dataCumprir, idAcademia], (err, results) => {
            if (err) {
              return res.json(err)
            }
            res.send(results)
          })
          break;
        case "UpdateMeta":
          db.query("update tblMeta set metGordura = ?, metPeso = ?, metDataCumprir = ?, metStatusAlterar = 1 where metId = ?", [parseInt(data.metaGordura), parseInt(data.metaPeso), data.dataCumprir, data.idMetaAtual], (err, results) => {
            if (err) {
              return res.json(err)
            }
            res.send(results)
          })
          break;
        case "ReadMetaAtual":
          db.query("select metId, metStatusAlterar from tblMeta where metIdCliente = ? and metIdAcad = ?", [data, idAcademia], (err, results) => {
            if (err) {
              res.json(err)
            }
            if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
              return res.json(false)
            }
            res.send(results)
          })
          break;
      }
    }
  })


});

module.exports = router;