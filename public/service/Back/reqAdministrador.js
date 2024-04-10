//READ

async function ReadPlanos(idAcademia) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadPlanos",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadFuncionarioDetalhes(idAcademia, funId) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: funId,
      idAcademia,
      acao: "ReadFuncionarioDet",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadClienteDetalhes(idAcademia, cliId) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: cliId,
      idAcademia,
      acao: "ReadClienteDet",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadAcademia(idAcademia) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadAcademia",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadCliente(idAcademia) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      idAcademia,
      acao: "ReadClientes",
    }),
  });
  const result = await response.json();
  return result;
}

async function ReadFuncionario(nivel, idAcademia) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: nivel,
      idAcademia,
      acao: "ReadFuncionarios",
    }),
  });
  const result = await response.json();
  return result;
}

//REGISTER

async function RegisterCliente(data, idAcademia) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "RegisterCliente",
    }),
  });
  const result = await response.json();
  return result;
}

async function RegisterFuncionario(data, idAcademia) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "RegisterFuncionario",
    }),
  });
  const result = await response.json();
  return result;
}



//ARCHIVE

async function ArchiveCliente(idCliente) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: idCliente,
      acao: "ArchiveCliente",
    }),
  });

  const result = await response.json();
  return result;
}

async function ArchiveFuncionario(idFuncionario) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: idFuncionario,
      acao: "ArchiveFuncionario",
    }),
  });

  const result = await response.json();
  return result;
}

//UPDATE

async function UpdateFuncionarioDetalhes(data) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      acao: "UpdateFuncionarioDetalhes",
    }),
  });
  const result = await response.json();
  return result;
}

async function UpdateClienteDetalhes(data) {
  const response = await fetch("/Administrador", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      acao: "UpdateClienteDetalhes",
    }),
  });
  const result = await response.json();
  return result;
}

//Validação

const cliCelular = document.getElementById("cliCelular");
  const funCelular = document.getElementById("funCelular");
  const cliDetCelular = document.getElementById("cliDetCelular");
  const funDetCelular = document.getElementById("funDetCelular");
  const funDetCpf = document.getElementById("funDetCpf");
  const cliDetCpf = document.getElementById("cliDetCpf");
  const cliCpf = document.getElementById("cliCpf");
  const funCpf = document.getElementById("funCpf");
  if(funCelular) {
    funCelular.addEventListener("input", () => FormatarCelular(funCelular));
    funDetCelular.addEventListener("input", () => FormatarCelular(funDetCelular));
    funDetCpf.addEventListener("input", () => HandleInputCpf(funDetCpf));
    funDetCpf.addEventListener("blur", (e) => VerificarCpfCadastrado(e, e.target.value, "fun"));
    funDetCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
    funCpf.addEventListener("input", () => HandleInputCpf(funCpf));
    funCpf.addEventListener("blur", (e) => VerificarCpfCadastrado(e, e.target.value, "fun"));
    funCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
  }
  cliCelular.addEventListener("input", () => FormatarCelular(cliCelular));
  cliDetCelular.addEventListener("input", () => FormatarCelular(cliDetCelular));
  cliDetCpf.addEventListener("input", () => HandleInputCpf(cliDetCpf));
  cliDetCpf.addEventListener("blur", (e) => VerificarCpfCadastrado(e, e.target.value, "cli"));
  cliDetCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));
  cliCpf.addEventListener("input", () => HandleInputCpf(cliCpf));
  cliCpf.addEventListener("blur", (e) => VerificarCpfCadastrado(e, e.target.value, "cli"));
  cliCpf.addEventListener("blur", (e) => validarCpfCadastrado(e, e.target.value));