const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const path = require("path");

//Import Routers
const equipeRoutes = require("./router/Equipe.js")
const administradorRoutes = require("./router/Administrador.js")
const clienteRoutes = require("./router/Cliente.js")
const funcionarioRoutes = require("./router/Funcionario.js")
const fichaRoutes = require("./router/Ficha.js")
const dashboardRoutes = require("./router/Dashboard.js")
const loginRoutes = require("./router/Login.js")

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("../public"));

app.get("/", (req, res) => {
  const indexPath = path.resolve(__dirname, "../index.html");
  res.sendFile(indexPath);
});

app.get("/Login", (req, res) => {
  const loginPath = path.resolve(__dirname, "../pages/login.html");
  res.sendFile(loginPath);
})

app.get("/Administrador", (req, res) => {
  const administradorPath = path.resolve(__dirname, "../pages/administrador.html");
  res.sendFile(administradorPath);
})

app.get("/Cliente", (req, res) => {
  const clientePath = path.resolve(__dirname, "../pages/cliente.html");
  res.sendFile(ClientePath);
})

app.get("/Equipe", (req, res) => {
  const equipePath = path.resolve(__dirname, "../pages/equipe.html");
  res.sendFile(equipePath);
})

app.get("/Funcionario", (req, res) => {
  const funcionarioPath = path.resolve(__dirname, "../pages/funcionario.html");
  res.sendFile(funcionarioPath);
})


//EQUIPE

app.use(equipeRoutes);

//CLIENTE

app.use(clienteRoutes);

//FUNCIONARIO

app.use(funcionarioRoutes);

//ADMINISTRADOR

app.use(administradorRoutes);

//FICHA

app.use(fichaRoutes);

//DASHBOARD

app.use(dashboardRoutes);

//LOGIN

app.use(loginRoutes);

app.listen(port, () => {
  console.log(`Server running in ${port}`);
});
