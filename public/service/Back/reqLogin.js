document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  switch (data.userType) {
    case "0":
      const sucessCliente = await handleLoginCliente(data);
      if (sucessCliente) {
        alert("Sucesso!");
        localStorage.setItem("dados", JSON.stringify(sucessCliente));

        window.location.href = "/Cliente";
      } else {
        alert("Algo deu errado, verifique seu email e sua senha");
      }
      break;
    case "1":
      const sucessFuncionario = await handleLoginFuncionario(data);
      if (sucessFuncionario) {
        alert("Sucesso!");
        localStorage.setItem("dados", JSON.stringify(sucessFuncionario));
        switch (sucessFuncionario.funNivel) {
          case 1:
            window.location.href = "/Funcionario";
            break;
          case 2:
            window.location.href = "/Administrador";
            break;
          case 3:
            window.location.href = "/Equipe";
            break;
        }
      } else {
        alert("Algo deu errado, verifique seu email e sua senha");
      }
      break;
  }
});

async function handleLoginCliente(data) {
  const response = await fetch("http://localhost:3000/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "LoginCliente",
      data,
    }),
  });
  const result = await response.json();
  return result;
}

async function handleLoginFuncionario(data) {
  const response = await fetch("http://localhost:3000/Login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      acao: "LoginFuncionario",
      data,
    }),
  });
  const result = await response.json();
  return result;
}
