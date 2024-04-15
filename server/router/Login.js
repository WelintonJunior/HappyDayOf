const express = require("express");
const router = express.Router();
const db = require("../database/database");
const argon2 = require('argon2');

router.post("/Login", (req, res) => {
  const { acao, data } = req.body;
  const email = data.email;
  const senha = data.senha;
  switch (acao) {
    case "LoginCliente":
      db.query(
        "SELECT * FROM tblCliente WHERE cliEmail = ?",
        [email],
        async (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results.length === 0) {
            return res.json(false);
          }

          try {
            const isPasswordValid = await argon2.verify(
              results[0].cliSenha,
              senha
            );
            if (isPasswordValid) {
              res.json(results[0]);
            } else {
              res.json(false);
            }
          } catch (error) {
            res.status(500).json(error);
          }
        }
      );
      break;

    case "LoginFuncionario":
      db.query(
        "SELECT * FROM tblFuncionario WHERE funEmail = ?",
        [email],
        async (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results.length === 0) {
            return res.json(false);
          }

          try {
            const isPasswordValid = await argon2.verify(
              results[0].funSenha,
              senha
            );
            if (isPasswordValid) {
              res.json(results[0]);
            } else {
              res.json(false);
            }
          } catch (error) {
            res.status(500).json(error);
          }
        }
      );
      break;
  }
});

module.exports = router;
