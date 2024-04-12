const express = require("express");
const db = require("../database/database")
const router = express.Router();

router.post("/Cliente", (req, res) => {
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
  }
});

module.exports = router;