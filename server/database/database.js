const mysql = require("mysql2");
require('dotenv').config({ path: "../.env" });
const SENHA_BANCO = process.env.SENHA_BANCO;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: SENHA_BANCO,
  database: "happyday2",
});

db.getConnection((err) => {
  if (err) {
    throw err;
  }
  console.log("Conexao estabelecida");
});

module.exports = db;
