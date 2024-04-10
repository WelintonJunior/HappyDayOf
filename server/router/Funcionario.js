const express = require("express");
const router = express.Router();
const db = require("../database/database");

router.post("/Funcionario", (req, res) => {
  const { acao, data, idAcademia } = req.body;

  switch (acao) {
    case "RegisterAtendimento":
      db.query(
        "insert into tblAtendimento values (default, ?, ?, ?, ?, 1, null)",
        [data.ateIdCliente, data.funId, data.dateNow, idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "ReadAtendimento":
      db.query(
        "select a.*,f.funId,c.cliNome from tblAtendimento as a join tblCliente as c on a.ateIdCliente = c.cliId join tblFuncionario as f on a.ateIdFuncionario = f.funId where a.ateIdAcad = ? and a.ateIdFuncionario = ? order by a.ateStatus desc , a.ateDateInicio desc",
        [idAcademia, data],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (
            results.length > 0 ? results[0].length === 0 : results.length === 0
          ) {
            return res.json(true);
          }
          res.send(results);
        }
      );
      break;
    case "ValidacaoAtendimento":
      db.query(
        "select a.*,f.funId,c.cliNome from tblAtendimento as a join tblCliente as c on a.ateIdCliente = c.cliId join tblFuncionario as f on a.ateIdFuncionario = f.funId where a.ateIdAcad = ? and a.ateIdFuncionario = ? and c.cliId = ? and a.ateStatus = 1",
        [idAcademia, data.funId, data.ateIdCliente],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (
            results.length > 0 ? results[0].length === 0 : results.length === 0
          ) {
            return res.json(true);
          }
          res.send(false);
        }
      );
      break;
    case "UpdateStatusAtendimento":
      db.query(
        "update tblAtendimento set ateStatus = 0, ateDateEncerramento = ? where ateId = ? and ateIdAcad = ?",
        [data.dateNow, data.ateId, idAcademia],
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