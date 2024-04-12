document.getElementById("formLogin").addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const loginServices = new LoginServices();
    switch (data.userType) {
      case "0":
        const sucessCliente = await loginServices.handleLoginCliente(data);
        if (sucessCliente) {
          alert("Sucesso!");
          localStorage.setItem("dados", JSON.stringify(sucessCliente));
  
          window.location.href = "/Cliente";
        } else {
          alert("Algo deu errado, verifique seu email e sua senha");
        }
        break;
      case "1":
        const sucessFuncionario = await loginServices.handleLoginFuncionario(data);
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

function setDefaultBackground() {
    var userType = document.getElementById("userType").value;
    var body = document.body;

    if (userType === "0") {
        body.classList.remove("bodyLoginFuncionario");
        body.classList.add("bodyLoginCliente");
    } else if (userType === "1") {
        body.classList.remove("bodyLoginCliente");
        body.classList.add("bodyLoginFuncionario");
    }
}

window.onload = function() {
    setDefaultBackground();
    document.body.style.transition = "1s";
};

document.getElementById("userType").addEventListener("change", function () {
    var userType = document.getElementById("userType").value;
    var body = document.body;

    if (userType === "0") {
        body.classList.remove("bodyLoginFuncionario");
        body.classList.add("bodyLoginCliente");
    } else if (userType === "1") {
        body.classList.remove("bodyLoginCliente");
        body.classList.add("bodyLoginFuncionario");
    }
});