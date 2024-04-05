let dados = [];

//Verifica se está logado
try {
  //Pega os dados armazenados no localStorage do navegador, dados sobre o usuário logado no momento
  const dadosFromLocalStorage = JSON.parse(localStorage.getItem("dados"));
  if (dadosFromLocalStorage !== null) {
    dados = dadosFromLocalStorage;
  } else {
    alert("Acesso Negado");
    window.location.href = "/";
  }
} catch (err) {
  alert("Acesso Negado");
  window.location.href = "/";
}

//Pega o id da Academia de acordo com o usuario logado no momento
const idAcademia = dados.funIdAcad;
let tela = "";
