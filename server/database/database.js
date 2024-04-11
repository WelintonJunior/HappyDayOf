const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "happyday2",
});

db.getConnection((err) => {
    if (err) {
      throw err;
    }
    console.log("Conexao estabelecida");
  });

module.exports = db;
