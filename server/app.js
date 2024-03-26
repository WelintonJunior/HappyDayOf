const mysql = require("mysql2")
const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")

const app = express();
const port = 3000

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "2206",
    database: "happyday"
})

db.getConnection((err) => {
    if (err) {
        throw err
    }
    console.log("Conexao estabelecida")
})

app.use(cors());
app.use(bodyParser.json())

//FICHA TÉCNICA

app.post("/Ficha", (req, res) => {
    const { acao, /* DADOS */ } = req.body;

    switch (acao) {
        case "CreateFicha":
            break;
        case "ReadFicha":
            break;
        case "UpdateFicha":
            break;
        case "DeleteFicha":
            break;
    }
})

//CLIENTE

app.post("/Cliente", (req, res) => {
    const { acao, /* DADOS */ } = req.body;

    switch (acao) {
        case "CreateCliente":
            break;
        case "ReadCliente":
            break;
        case "UpdateCliente":
            break;
        case "DeleteCliente":
            break;
    }
})

//FUNCIONARIO

app.post("/Funcionario", (req, res) => {
    const { acao, /* DADOS */ } = req.body;

    switch (acao) {
        case "CreateFuncionario":
            break;
        case "ReadFuncionario":
            break;
        case "UpdateFuncionario":
            break;
        case "DeleteFuncionario":
            break;
    }
})

//DASHBOARD

app.post("/Dashboard", (req, res) => {
    const { acao, /* DADOS */ } = req.body;

    switch (acao) {
       
    }
})

app.listen(port, () => {
    console.log(`Server running in ${port}`)
})