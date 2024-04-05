// Definir uma função para executar a ação de acordo com o valor padrão do select
function setDefaultBackground() {
    var userType = document.getElementById("userType").value;

    if (userType === "0") {
        document.body.style.background = "url('./images/cliente.jpg')"; // Define o background para Cliente
    } else if (userType === "1") {
        document.body.style.background = "url('./images/funcionario.jpg')"; // Define o background para Funcionário
    }

    // Ajusta a imagem para cobrir a tela inteira
    document.body.style.backgroundSize = "cover";
}

// Chamar a função para definir o valor padrão ao carregar a página
window.onload = setDefaultBackground;

// Adicionar um event listener para monitorar mudanças no select
document.getElementById("userType").addEventListener("change", function() {
    var userType = document.getElementById("userType").value;

    if (userType === "0") {
        document.body.style.background = "url('../images/cliente.jpg')"; // Define o background para Cliente
    } else if (userType === "1") {
        document.body.style.background = "url('../images/funcionario.jpg')"; // Define o background para Funcionário
    }

    // Ajusta a imagem para cobrir a tela inteira
    document.body.style.backgroundSize = "cover";
});
