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