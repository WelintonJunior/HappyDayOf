const express = require("express");
const db = require('../database/database');
const router = express.Router();
const argon2 = require('argon2');
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../app.js")

router.post("/Administrador", async (req, res) => {
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
        case "ReadClientes":
          db.query(
            "SELECT * FROM tblCliente WHERE cliIdAcad = ? ORDER BY cliStatus DESC, cliNome ASC",
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
        case "ReadAparelhos":
          db.query(
            "SELECT * FROM tblAparelhos WHERE apaIdAcad = ? ORDER BY apaStatus DESC, apaNome ASC",
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
        case "ReadExercicios":
          db.query(
            "SELECT * FROM tblExercicios WHERE exeIdAcad = ? ORDER BY exeStatus DESC, exeNome ASC",
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
              if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
                return res.json(false);
              }
              res.send(results[0]);
            }
          );
          break;
        case "ReadAparelhoDet":
          db.query(
            "select * from tblAparelhos where apaId = ? and apaIdAcad = ? ",
            [data, idAcademia],
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
        case "ReadExericioDet":
          db.query(
            "select * from tblExercicios where exeId = ? and exeIdAcad = ? ",
            [data, idAcademia],
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
        case "ReadFuncionarios":
          db.query(
            "select * from tblFuncionario where funIdAcad = ? and funNivel = ? order by funStatus desc, funNome ASC",
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
              if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
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
          try {
            const hashedPasswordFun = await argon2.hash(data.funSenha);
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
                hashedPasswordFun,
                1,
              ],
              (err, results) => {
                if (err) {
                  return res.json(err);
                }
                res.send(results);
              }
            );
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering user' });
          }
          break;
        case "RegisterCliente":
          try {
            const hashedPasswordCli = await argon2.hash(data.cliSenha);
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
                hashedPasswordCli,
              ],
              (err, results) => {
                if (err) {
                  return res.json(err);
                }
                res.send(results);
              }
            );
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering user' });
          }
          break;
        case "RegisterAparelho":
          try {
            db.query(
              "insert into tblAparelhos values (DEFAULT, ?, ?, null ,1, ?)",
              [
                data.apaNome,
                data.apaDataEntrada,
                idAcademia,
              ],
              (err, results) => {
                if (err) {
                  return res.json(err);
                }
                res.send(results);
              }
            );
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering aparelho' });
          }
          break;
        case "RegisterExercicio":
          try {
            db.query(
              "insert into tblExercicios values (DEFAULT, ?, ?, 1, ?)",
              [
                data.exeNome,
                data.exeApaId,
                idAcademia,
              ],
              (err, results) => {
                if (err) {
                  return res.json(err);
                }
                res.send(results);
              }
            );
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error registering Exercicio' });
          }
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
        case "ArchiveAparelho":
          db.query(
            "update tblAparelhos set apaStatus = ? where apaId = ?",
            [0, data],
            (err, results) => {
              if (err) {
                return res.json(err);
              }
              res.send(results);
            }
          );
          break;
        case "ArchiveExercicio":
          db.query(
            "update tblExercicios set exeStatus = ? where exeId = ?",
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
        case "AtivarCliente":
          db.query("update tblCliente set cliStatus = 1 where cliId = ?", [data], (err, results) => {
            if (err) {
              return res.json(err)
            }
            res.send(results)
          })
          break;
        case "AtivarFuncionario":
          db.query("update tblFuncionario set funStatus = 1 where funId = ?", [data], (err, results) => {
            if (err) {
              return res.json(err)
            }
            res.send(results)
          })
          break;
        case "AtivarAparelho":
          db.query("update tblAparelhos set apaStatus = 1 where apaId = ?", [data], (err, results) => {
            if (err) {
              return res.json(err)
            }
            res.send(results)
          })
          break;
        case "AtivarExercicio":
          db.query("update tblExercicios set exeStatus = 1 where exeId = ?", [data], (err, results) => {
            if (err) {
              return res.json(err)
            }
            res.send(results)
          })
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
        case "UpdateAparelhoDetalhes":
          db.query(
            "update tblAparelhos set apaNome = ?, apaDataEntrada = ?, apaStatus = ? where apaId = ?",
            [
              data.apaNome,
              data.apaDataEntrada,
              data.apaStatus,
              data.apaId,
            ],
            (err, results) => {
              if (err) {
                return res.json(err);
              }
              res.send(results);
            }
          );
          break;
        case "UpdateExercicioDetalhes":
          db.query(
            "update tblExercicios set exeNome = ?, exeApaId = ?, exeStatus = ? where exeId = ?",
            [
              data.exeNome,
              data.exeApaId,
              data.exeStatus,
              data.exeId,
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
              db.query("SELECT funCpf FROM tblFuncionario WHERE funCpf = ? AND funId != ?", [data.cpf, data.id], (err, results) => {
                if (err) {
                  return res.json(err);
                }
                if (results.length === 0) {
                  res.send(true);
                } else {
                  res.send(false);
                }
              });
              break;
            case "cli":
              db.query("SELECT cliCpf FROM tblCliente WHERE cliCpf = ? AND cliId != ?", [data.cpf, data.id], (err, results) => {
                if (err) {
                  return res.json(err)
                }
                if (results.length === 0) {
                  res.send(true);
                } else {
                  res.send(false);
                }
              })
              break;

          }
          break;
        case "VerificarCpfCadastradoGeral":
          switch (data.modulo) {
            case "fun":
              db.query("SELECT funCpf FROM tblFuncionario WHERE funCpf = ?", [data.cpf], (err, results) => {
                if (err) {
                  return res.json(err);
                }
                if (results.length === 0) {
                  res.send(true);
                } else {
                  res.send(false);
                }
              });
              break;
            case "cli":
              db.query("SELECT cliCpf FROM tblCliente WHERE cliCpf = ?", [data.cpf], (err, results) => {
                if (err) {
                  return res.json(err)
                }
                if (results.length === 0) {
                  res.send(true);
                } else {
                  res.send(false);
                }
              })
              break;

          }
          break;
        case "VerificarEmailCadastrado":
          switch (data.modulo) {
            case "fun":
              db.query("select funEmail from tblFuncionario where funEmail = ? AND funId != ?", [data.email, data.id], (err, results) => {
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
              db.query("select cliEmail from tblCliente where cliEmail = ? AND cliId != ?", [data.email, data.id], (err, results) => {
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
        case "VerificarEmailCadastradoGeral":
          switch (data.modulo) {
            case "fun":
              db.query("select funEmail from tblFuncionario where funEmail = ?  ", [data.email], (err, results) => {
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
              db.query("select cliEmail from tblCliente where cliEmail = ?  ", [data.email], (err, results) => {
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
    }
  })
});

module.exports = router;
