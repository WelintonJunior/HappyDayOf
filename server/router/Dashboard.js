const express = require("express");
const router = express.Router();
const db = require("../database/database");

router.post("/Dashboard", (req, res) => {
  const { acao, data, idAcademia } = req.body;

  switch (acao) {
    case "TaxaAdocao":
      break;
    case "ReadSatisfacao":
      db.query("select * from tblSatisfacao where satStatus = 1 and satIdAcademia = ?", [idAcademia], (err, satisfacoes) => {
        console.log(idAcademia)
        if (err) {
          return res.json(err)
        }
        if (satisfacoes.length > 0 ? satisfacoes[0].length === 0 : satisfacoes.length === 0) {
          return res.json(false)
        }
        res.send(satisfacoes)
      })
      break;
    case "ReadAtendimentos":
      db.query("select ateIdFuncionario from tblAtendimento where ateId = ?", [data], (err, results) => {
        if (err) {
          return res.json(err)
        }
        if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
          return res.json(false)
        }
        res.send(results)
      })
      break;
    case "ReadFuncNome":
      db.query("select funnome from tblFuncionario where funId = ?", [data], (err, results) => {
        if (err) {
          return res.json(err)
        }
        if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
          return res.json(false)
        }
        res.send(results)
      })
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

module.exports = router;
