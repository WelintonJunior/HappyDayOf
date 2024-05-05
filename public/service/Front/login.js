document.getElementById("formLogin").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const dateNow = getFormattedDateTime();
  data.DateNow = dateNow;
  const loginServices = new LoginServices();
  switch (data.userType) {
    case "0":
      showLoading()
      const sucessCliente = await loginServices.handleLoginCliente(data);
      hideLoading()
      if (!sucessCliente.error) {
        localStorage.setItem("dados", JSON.stringify(sucessCliente));
        window.location.href = "/Cliente";
      } else {
        alert("Algo deu errado, verifique seu email e sua senha");
      }
      break;
    case "1":
      showLoading()
      const sucessFuncionario = await loginServices.handleLoginFuncionario(data);
      hideLoading()
      if (!sucessFuncionario.error) {
        localStorage.setItem("dados", JSON.stringify(sucessFuncionario));
        switch (sucessFuncionario.dados.FunNivel) {
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

window.onload = function () {
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

function showLoading() {
  document.getElementById('loadingOverlay').style.display = 'block';
}

function hideLoading() {
  document.getElementById('loadingOverlay').style.display = 'none';
}