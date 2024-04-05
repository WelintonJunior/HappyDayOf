const express = require("express");
const router = express.Router();
const db = require("../database/database");

router.post("/Dashboard", (req, res) => {
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

module.exports = router;
