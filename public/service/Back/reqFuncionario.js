async function RegisterAtendimento(idAcademia, data) {
  const response = await fetch("http://localhost:3000/Funcionario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "RegisterAtendimento",
    }),
  });
  const result = await response.json();
  return result;
}
async function ReadAtendimento(idAcademia, data) {
  const response = await fetch("http://localhost:3000/Funcionario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "ReadAtendimento",
    }),
  });
  const result = await response.json();
  return result;
}

async function ValidacaoAtendimento (idAcademia, data) {
  const response = await fetch("http://localhost:3000/Funcionario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "ValidacaoAtendimento",
    }),
  });
  const result = await response.json();
  return result;
}

async function UpdateStatusAtendimento(idAcademia, data) {
  const response = await fetch("http://localhost:3000/Funcionario", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data,
      idAcademia,
      acao: "UpdateStatusAtendimento",
    }),
  });
  const result = await response.json();
  return result;
}

//Validação

// const cliCelular = document.getElementById("cliCelular");
// const cliDetCelular = document.getElementById("cliDetCelular");
// const cliDetCpf = document.getElementById("cliDetCpf");
// const cliCpf = document.getElementById("cliCpf");
// cliCelular.addEventListener("input", () => FormatarCelular(cliCelular));
// cliDetCelular.addEventListener("input", () => FormatarCelular(cliDetCelular));
// cliDetCpf.addEventListener("input", () => HandleInputCpf(cliDetCpf));
// cliCpf.addEventListener("input", () => HandleInputCpf(cliCpf));