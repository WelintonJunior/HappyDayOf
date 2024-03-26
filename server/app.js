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
    database: "happyday2"
})

db.getConnection((err) => {
    if (err) {
        throw err
    }
    console.log("Conexao estabelecida")
})

app.use(cors());
app.use(bodyParser.json())

//Academia

app.post("/Academia", (req, res) => {
    const { acao, data } = req.body;

    const cnpj = data.acaCnpj;
    const nome = data.acaNome;
    const date = data.acaDataCadastro;
    // const status = data.acaStatus;
    const celular = data.acaCelular;
    const cep = data.acaCep;

    switch (acao) {
        case "CreateAcademia":
            db.query("insert into tblAcademia values (DEFAULT,?,?,?,?,?,?)",
                [cnpj, nome, date, 1, celular, cep], (err, results) => {
                    if (err) {
                        return res.json(err)
                    }
                    res.send(results)
                })
            break;
        case "ReadAcademia":
            break;
        case "UpdateAcademia":
            break;
        case "DeleteAcademia":
            break;
    }
})

//FICHA TÉCNICA

app.post("/Ficha", (req, res) => {
    const { acao, idAcademia } = req.body;

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
    const { acao, idAcademia } = req.body;

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
    const { acao, idAcademia } = req.body;

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
    const { acao, idAcademia } = req.body;

    switch (acao) {

    }
})

app.listen(port, () => {
    console.log(`Server running in ${port}`)
})