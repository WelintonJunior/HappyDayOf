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

const btnEsqueceuSenha = document.getElementById("btnEsqueceuSenha")
const modalEsqueceuSenha = document.getElementById("modalEsqueceuSenha")
const fecharModalEsqueceuSenha = document.getElementById("fecharModalEsqueceuSenha")
const formEsqueceuSenha = document.getElementById("formEsqueceuSenha")
const modalInserirCodigo = document.getElementById("modalInserirCodigo")
const fecharModalInserirCodigo = document.getElementById("fecharModalInserirCodigo")
const formInserirCodigo = document.getElementById("formInserirCodigo")
const modalTrocarSenha = document.getElementById("modalTrocarSenha")
const fecharModalTrocarSenha = document.getElementById("fecharModalTrocarSenha")
const formTrocarSenha = document.getElementById("formTrocarSenha")

btnEsqueceuSenha.addEventListener("click", (e) => {
  e.preventDefault()
  modalEsqueceuSenha.style.display = "block"
})

fecharModalEsqueceuSenha.onclick = function () {
  modalEsqueceuSenha.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalEsqueceuSenha) {
    modalEsqueceuSenha.style.display = "none";
  }
};
fecharModalInserirCodigo.onclick = function () {
  modalInserirCodigo.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalInserirCodigo) {
    modalInserirCodigo.style.display = "none";
  }
};
fecharModalTrocarSenha.onclick = function () {
  modalTrocarSenha.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modalTrocarSenha) {
    modalTrocarSenha.style.display = "none";
  }
};

formEsqueceuSenha.addEventListener("submit", async (e) => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd.entries())
  let modulo = document.getElementById("userType").value
  if (modulo == 0) {
    data.modulo = "cli"
  } else {
    data.modulo = "fun"
  }
  const loginServices = new LoginServices();
  const result = await loginServices.VerificarEmailParaRecuperarSenha(data.email, data.modulo)
  showLoading()
  if (!result) {
    await loginServices.EnviarEmail(data.email, data.modulo)
  }
  hideLoading()
  alert("Email enviado")
  resetRecuperarSenha(e)
  modalEsqueceuSenha.style.display = "none";
  modalInserirCodigo.style.display = "block"
})

formInserirCodigo.addEventListener("submit", async (e) => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd.entries())
  const loginServices = new LoginServices();
  const result = await loginServices.VerificarCodigo(data.codigo)

  if (result.RecEmail != "") {
    document.getElementById("recEmail").value = result.RecEmail
    document.getElementById("recModulo").value = result.RecModulo
    modalInserirCodigo.style.display = "none"
  }
  if (result.RecEmail != "") {
    modalTrocarSenha.style.display = "block"
  }
  e.target.reset()
})

formTrocarSenha.addEventListener("submit", async (e) => {
  e.preventDefault()
  const fd = new FormData(e.target)
  const data = Object.fromEntries(fd.entries())
  const loginServices = new LoginServices();
  data.email = document.getElementById("recEmail").value
  data.modulo = document.getElementById("recModulo").value
  showLoading()
  const result = await loginServices.TrocarSenha(data.senha, data.email, data.modulo)
  hideLoading()
  if (result) {
    alert("Senha alterada com sucesso")
  }
  modalTrocarSenha.style.display = "none"
  resetRecuperarSenha(e)
})

function resetRecuperarSenha(e) {
  e.target.reset()
  document.getElementById("recEmail").value = ""
  document.getElementById("recModulo").value = ""
}
