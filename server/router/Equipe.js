const express = require("express");
const router = express.Router();
const db = require("../database/database")
const argon2 = require('argon2');

router.use("/Equipe", async (req, res) => {
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
        const hashedPasswordAdm = await argon2.hash(data.admSenha);
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
            hashedPasswordAdm,
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

module.exports = router;