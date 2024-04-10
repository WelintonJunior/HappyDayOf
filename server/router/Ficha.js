const express = require("express");
const router = express.Router();
const db = require("../database/database");

router.post("/Ficha", (req, res) => {
  const { acao, data, idAcademia } = req.body;
  switch (acao) {
    case "ReadClienteFicha":
      db.query(
        "SELECT c.*, CASE WHEN f.ficIdCliente IS NOT NULL THEN 1 ELSE 0 END AS ClienteExisteNaFicha  FROM tblCliente AS c LEFT JOIN tblFicha AS f ON c.cliId = f.ficIdCliente where c.cliIdAcad = ? GROUP BY c.cliId",
        [idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (
            results.lenght > 0 ? results[0].length === 0 : results.length === 0
          ) {
            return res.json(false);
          }
          res.send(results);
        }
      );
      break;
    case "ReadFicha":
      db.query(
        "select * from tblFicha where ficIdCliente = ? and ficIdAcademia = ?",
        [data.cliId, idAcademia],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results.length > 0 ? results[0].length === 0 : results.length === 0) {
            return res.json(false);
          }
          const DadosFicha = results[0];
          db.query(
            "select * tblFichaDetalhes where detIdFicha = ?",
            [DadosFicha.ficId],
            (err, result) => {
              if (err) {
                return res.json(err);
              }
              if (result[0].length) {
                return res.json(false);
              }
              const DadosFichaDetalhes = result[0];
              res.send(DadosFichaDetalhes);
            }
          );
        }
      );
      break;
    case "ReadFichaDetalhes":
      db.query(
        "select fic.*, det.* from tblFicha as fic join tblFichaDetalhes as det on fic.ficId = det.detIdFicha where fic.ficIdCliente = ? and det.detTreino = ?",
        [data.cliId, data.tipo],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results.length === 0) {
            db.query(
              "select * from tblFicha where ficIdCliente = ?",
              [data],
              (err, result) => {
                if (err) {
                  return res.json(err);
                }
                if (result[0].length === 0) {
                  return res.json(false);
                }
                res.send(result[0]);
              }
            );
          } else {
            res.send(results);
          }
        }
      );
      break;
    case "ReadFichaDetalhesGeral":
      db.query(
        "select fic.*, det.* from tblFicha as fic join tblFichaDetalhes as det on fic.ficId = det.detIdFicha where fic.ficIdCliente = ?",
        [data],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          if (results.length === 0) {
            db.query(
              "select * from tblFicha where ficIdCliente = ?",
              [data],
              (err, result) => {
                if (err) {
                  return res.json(err);
                }
                if (result.length > 0 ? result[0].length === 0 : result.length === 0) {
                  return res.json(false);
                }
                res.send(result[0]);
              }
            );
          } else {
            res.send(results);
          }
        }
      );
      break;
    case "RegisterFicha":
      db.query(
        "insert into tblFicha values (default, ?, ?, ?, ?, ? ,?)",
        [
          data.ficCliId,
          data.funId,
          idAcademia,
          data.ficIntervalo,
          data.ficRestricoes,
          data.ficTipoRestricoes,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "RegisterDetalhesFicha":
      db.query(
        "insert into tblFichaDetalhes values (default, ?, ?, ?, ?, ?, ?)",
        [
          data.detVariacao,
          data.detCarga,
          data.detSerie,
          data.detRepeticao,
          data.detIdFicha,
          data.detTreino,
        ],
        (err, results) => {
          if (err) {
            return res.json(err);
          }
          res.send(results);
        }
      );
      break;
    case "UpdateDetalhesFicha":
      db.query(
        "update tblFichaDetalhes set detIdAparelho = ?, detVariacao = ?, detCarga = ?, detSerie = ?, detRepeticao = ? where detId = ?",
        [
          data.apaId,
          data.detVariacao,
          data.detCarga,
          data.detSerie,
          data.detRepeticao,
          data.detId,
        ]
      );
      break;
    case "UpdateCampoFicha":
      switch (data.detCampo) {
        case "detVariacao":
          db.query(
            "update tblFichaDetalhes set detVariacao = ? where detId = ?",
            [data.valor, data.detId],
            (err, results) => {
              if (err) {
                return res.json(err);
              }
              res.send(results);
            }
          );
          break;
        case "detCarga":
          db.query(
            "update tblFichaDetalhes set detCarga = ? where detId = ?",
            [data.valor, data.detId],
            (err, results) => {
              if (err) {
                return res.json(err);
              }
              res.send(results);
            }
          );
          break;
        case "detSerie":
          db.query(
            "update tblFichaDetalhes set detSerie = ? where detId = ?",
            [data.valor, data.detId],
            (err, results) => {
              if (err) {
                return res.json(err);
              }
              res.send(results);
            }
          );
          break;
        case "detRepeticao":
          db.query(
            "update tblFichaDetalhes set detRepeticao = ? where detId = ?",
            [data.valor, data.detId],
            (err, results) => {
              if (err) {
                return res.json(err);
              }
              res.send(results);
            }
          );
          break;
      }
      break;
  }
});

module.exports = router;
