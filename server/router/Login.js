const express = require("express");
const router = express.Router();
const db = require("../database/database");

router.post("/Login", (req, res) => {
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

module.exports = router;
