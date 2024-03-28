//CPF

const admCpf = document.getElementById("admCpf");
admCpf.addEventListener("input", () => HandleInputCpf(admCpf));
// admCpf.addEventListener("blur", () => validarCPF(admCpf.value));

function HandleInputCpf(campo) {
  let valorCpf = campo.value;

  valorCpf = valorCpf.replace(/\D/g, "");

  valorCpf = formatarCPF(valorCpf);

  campo.value = valorCpf;
}

// Função para formatar o CPF
function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

// function validarCPF(cpf) {
//   var cpfRegex = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/;
//   if (!cpfRegex.test(cpf)) {
//     return false;
//   }

//   var numeros = cpf.match(/\d/g).map(Number);
//   var soma = numeros.reduce((acc, cur, idx) => {
//     if (idx < 9) {
//       return acc + cur * (10 - idx);
//     }
//     return acc;
//   }, 0);

//   var resto = (soma * 10) % 11;

//   if (resto === 10 || resto === 11) {
//     resto = 0;
//   }

//   if (resto !== numeros[9]) {
//     return false;
//   }

//   soma = numeros.reduce((acc, cur, idx) => {
//     if (idx < 10) {
//       return acc + cur * (11 - idx);
//     }
//     return acc;
//   }, 0);

//   resto = (soma * 10) % 11;

//   if (resto === 10 || resto === 11) {
//     resto = 0;
//   }

//   if (resto !== numeros[10]) {
//     return false;
//   }

//   return true;
// }

//CNPJ

let acaCnpj = document.getElementById("acaCnpj");
acaCnpj.addEventListener("input", () => HandleInputCnpj(acaCnpj));
acaCnpj.addEventListener("blur", () => HandleBlurCnpj(acaCnpj));

function HandleBlurCnpj(campo) {
  let valorCnpj = campo.value;
  if (validarCNPJ(valorCnpj)) {
  } else {
    campo.value = "";
    alert("CNPJ inválido");
  }
}

function HandleInputCnpj(campo) {
  let valorCnpj = campo;
  let cnpjAtual = valorCnpj.value.replace(/\D/g, "");
  cnpjAtual = cnpjAtual.replace(
    /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    "$1.$2.$3/$4-$5"
  );
  valorCnpj.value = cnpjAtual;
}

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, "");

  if (cnpj == "") return false;

  if (cnpj.length != 14) return false;

  // Elimina CNPJs invalidos conhecidos
  if (
    cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999"
  )
    return false;

  // Valida DVs
  tamanho = cnpj.length - 2;
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(0)) return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2) pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado != digitos.charAt(1)) return false;

  return true;
}

//Telefone

const acaTelefone = document.getElementById("acaTelefone");
acaTelefone.addEventListener("input", () => FormatarTelefone(acaTelefone));

function FormatarTelefone(campo) {
  let valorNumero = campo.value;
  let numeroAtual = valorNumero.replace(/\D/g, "");
  numeroAtual = numeroAtual.replace(/^(\d{4})(\d{4})$/, "$1-$2");
  campo.value = numeroAtual;
}

//Celular

const acaCelular = document.getElementById("acaCelular");
acaCelular.addEventListener("input", () => FormatarCelular(acaCelular));
const admCelular = document.getElementById("admCelular");
admCelular.addEventListener("input", () => FormatarCelular(admCelular));

function FormatarCelular(campo) {
  let valor = campo.value;
  valor = valor.replace(/\D/g, "");
  if (valor.length === 11) {
    valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (valor.length === 10) {
    valor = valor.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  }
  campo.value = valor;
}