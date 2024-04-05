const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2206",
    database: "happyday2",
});

db.getConnection((err) => {
    if (err) {
      throw err;
    }
    console.log("Conexao estabelecida");
  });

module.exports = db;
