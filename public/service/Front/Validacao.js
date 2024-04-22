function HandleInputCpf(campo) {
  let valorCpf = campo.value;

  valorCpf = valorCpf.replace(/\D/g, "");

  valorCpf = formatarCPF(valorCpf);

  campo.value = valorCpf;
}

function formatarCPF(cpf) {
  return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function validarCPF(cpf) {
  var cpfRegex = /^(?:(\d{3}).(\d{3}).(\d{3})-(\d{2}))$/;
  if (!cpfRegex.test(cpf)) {
    return false;
  }

  var numeros = cpf.match(/\d/g).map(Number);
  var soma = numeros.reduce((acc, cur, idx) => {
    if (idx < 9) {
      return acc + cur * (10 - idx);
    }
    return acc;
  }, 0);

  var resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== numeros[9]) {
    return false;
  }

  soma = numeros.reduce((acc, cur, idx) => {
    if (idx < 10) {
      return acc + cur * (11 - idx);
    }
    return acc;
  }, 0);

  resto = (soma * 10) % 11;

  if (resto === 10 || resto === 11) {
    resto = 0;
  }

  if (resto !== numeros[10]) {
    return false;
  }

  return true;

}

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
  const now = moment().tz('America/Sao_Paulo');

  const formattedDateTime = now.format('YYYY-MM-DD HH:mm:ss');
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

async function VerificarCpfCadastrado(e, cpf, id, modulo, token) {
  if (cpf !== "") {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data: {
          cpf,
          id,
          modulo
        },
        acao: "VerificarCpfCadastrado"
      })
    })
    const result = await response.json()
    if (!result) {
      alert("CPF já cadastrado no sistema")
      e.target.value = "";
      setTimeout(() => {
        e.target.focus();
      }, 0)
    }
  }
}

async function VerificarCpfCadastradoGeral(e, cpf, modulo, token) {
  if (cpf !== "") {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}` },
      body: JSON.stringify({
        data: {
          cpf,
          modulo
        },
        acao: "VerificarCpfCadastradoGeral"
      })
    })
    const result = await response.json()
    if (!result) {
      alert("CPF já cadastrado no sistema")
      e.target.value = "";
      setTimeout(() => {
        e.target.focus();
      }, 0)
    }
  }
}

async function VerificarEmailCadastrado(e, email, id, modulo, token) {
  if (email !== "") {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}`  },
      body: JSON.stringify({
        data: {
          email,
          id,
          modulo
        },
        acao: "VerificarEmailCadastrado"
      })
    })
    const result = await response.json()
    if (!result) {
      alert("Email já cadastrado no sistema")
      if (e.target.value === "") {

      } else {
        setTimeout(() => {
          e.target.focus();
        }, 0)
      }
      e.target.value = "";
    }
  }
}

async function VerificarEmailCadastradoGeral(e, email, modulo, token) {
  if (email !== "") {
    const response = await fetch("/Administrador", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `${token}`  },
      body: JSON.stringify({
        data: {
          email,
          modulo
        },
        acao: "VerificarEmailCadastradoGeral"
      })
    })
    const result = await response.json()
    if (!result) {
      alert("Email já cadastrado no sistema")
      if (e.target.value === "") {

      } else {
        setTimeout(() => {
          e.target.focus();
        }, 0)
      }
      e.target.value = "";
    }
  }
}

async function validarCpfCadastrado(e, cpf) {
  const result = await validarCPF(cpf);
  if (!result) {
    alert("CPF Inválido")
    if (e.target.value === "") {

    } else {
      setTimeout(() => {
        e.target.focus();
      }, 0)
    }
    e.target.value = "";
  }
}

function verificarForm(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && (obj[key] === "" || obj[key] === null || obj[key] === undefined)) {
      return true;
    }
  }
  return false;
}