//CPF

if (ADMINISTRADOR === 1) {
  const cliCelular = document.getElementById("cliCelular");
  const funCelular = document.getElementById("funCelular");
  const cliDetCelular = document.getElementById("cliDetCelular");
  const funDetCelular = document.getElementById("funDetCelular");
  const funDetCpf = document.getElementById("funDetCpf");
  const cliDetCpf = document.getElementById("cliDetCpf");
  const cliCpf = document.getElementById("cliCpf");
  const funCpf = document.getElementById("funCpf");
  funCelular.addEventListener("input", () => FormatarCelular(funCelular));
  cliCelular.addEventListener("input", () => FormatarCelular(cliCelular));
  cliDetCelular.addEventListener("input", () => FormatarCelular(cliDetCelular));
  funDetCelular.addEventListener("input", () => FormatarCelular(funDetCelular));
  funDetCpf.addEventListener("input", () => HandleInputCpf(funDetCpf));
  cliDetCpf.addEventListener("input", () => HandleInputCpf(cliDetCpf));
  cliCpf.addEventListener("input", () => HandleInputCpf(cliCpf));
  funCpf.addEventListener("input", () => HandleInputCpf(funCpf));
} else if (EQUIPE === 1) {
  const admCpf = document.getElementById("admCpf");
  const acaTelefone = document.getElementById("acaTelefone");
  const acaCnpj = document.getElementById("acaCnpj");
  const acaCelular = document.getElementById("acaCelular");
  const admCelular = document.getElementById("admCelular");
  admCpf.addEventListener("input", () => HandleInputCpf(admCpf));
  acaCnpj.addEventListener("input", () => HandleInputCnpj(acaCnpj));
  acaCnpj.addEventListener("blur", () => HandleBlurCnpj(acaCnpj));
  acaTelefone.addEventListener("input", () => FormatarTelefone(acaTelefone));
  // admCpf.addEventListener("blur", () => validarCPF(admCpf.value));
  acaCelular.addEventListener("input", () => FormatarCelular(acaCelular));
  admCelular.addEventListener("input", () => FormatarCelular(admCelular));
} else if (CLIENTE === 1) {
} else if (FUNCIONARIO === 1) {
}

function HandleInputCpf(campo) {
  let valorCpf = campo.value;

  valorCpf = valorCpf.replace(/\D/g, "");

  valorCpf = formatarCPF(valorCpf);

  campo.value = valorCpf;
}

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

function FormatarTelefone(campo) {
  let valorNumero = campo.value;
  let numeroAtual = valorNumero.replace(/\D/g, "");
  numeroAtual = numeroAtual.replace(/^(\d{4})(\d{4})$/, "$1-$2");
  campo.value = numeroAtual;
}

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

//pegar data agora
function getFormattedDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  // Formato: YYYY-MM-DD HH:MM:SS
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
}

//Cep automatico

async function cepAutomatico(cep) {
  const cepConsulta = cep.replace(/\D/g, "");

  try {
    const url = `https://viacep.com.br/ws/${cepConsulta}/json/`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na consulta do CEP: ${response.statusText}`);
    }
    const data = await response.json();

    if (data.erro) {
      throw new Error("CEP não encontrado.");
    }

    return data;
  } catch (error) {
    console.error("Falha na requisição", error);
    return null;
  }
}

function verificarNumeros(string) {
  const regex = /\d/;

  if (regex.test(string)) {
    return "A string não pode conter números.";
  } else {
    return null;
  }
}
