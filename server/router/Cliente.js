const express = require("express");
const db = require("../database/database")
const router = express.Router();

router.post("/Cliente", (req, res) => {
    const { acao, idAcademia } = req.body;
  
    switch (acao) {
      case "UpdateCliente":
        break;
      case "ReadCliente":
        break;
      case "RegisterAvaliacaoProfessor":
        break;
    }
  });

  module.exports = router;