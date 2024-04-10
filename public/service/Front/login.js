// Definir uma função para executar a ação de acordo com o valor padrão do select
function setDefaultBackground() {
    var userType = document.getElementById("userType").value;

    if (userType === "0") {
        document.body.classList.remove("bodyLoginFuncionario");
        document.body.classList.add("bodyLoginCliente");
    } else if (userType === "1") {
        document.body.classList.remove("bodyLoginCliente");
        document.body.classList.add("bodyLoginFuncionario");
    }
}

// Chamar a função para definir o valor padrão ao carregar a página
window.onload = setDefaultBackground;

// Adicionar um event listener para monitorar mudanças no select
document.getElementById("userType").addEventListener("change", function () {
    var userType = document.getElementById("userType").value;

    if (userType === "0") {
        document.body.classList.remove("bodyLoginFuncionario");
        document.body.classList.add("bodyLoginCliente");
    } else if (userType === "1") {
        document.body.classList.remove("bodyLoginCliente");
        document.body.classList.add("bodyLoginFuncionario");
    }

});