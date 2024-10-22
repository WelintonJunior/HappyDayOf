class FichaServices {

  async ReadClienteFicha(idAcademia, token) {
    try {
      const response = await fetch("/Ficha/ReadClienteFicha", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          IdAcad: parseInt(idAcademia),
        }),
      });
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro as fichas dos clientes")
      throw err
    }
  }

  async ReadFichaDetalhes(CliId, Tipo, token) {
    try {
      const response = await fetch("/Ficha/ReadFichaDetalhes", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliId: parseInt(CliId),
          Tipo
        }
        )
      })
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ver os detalhes da ficha do cliente")
      throw err
    }
  }

  async ReadFichaDetalhesGeral(cliId, token) {
    try {
      const response = await fetch("/Ficha/ReadFichaDetalhesGeral", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          CliId: parseInt(cliId)
        })
      })
      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Erro ao ver os detalhes gerais da ficha do cliente")
      throw err
    }
  }

  async RegisterBaseFicha(idAcademia, data, token) {
    try {
      const response = await fetch("/Ficha/RegisterFicha", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          FicIdCliente: parseInt(data.ficCliId),
          FicIntervalo: data.ficIntervalo,
          FicRestricoes: parseInt(data.ficRestricoes),
          FicTipoRestricoes: data.ficTipoRestricoes,
          FicIdFuncionario: parseInt(data.funId),
          FicIdAcademia: parseInt(idAcademia)
        }),
      });
      const result = await response.json();
       if (result.message === "Não autorizado") {
            alert("Sessão expirada faça login novamente!")
            localStorage.clear()
            window.location.href = "/"
          }

      return result;
    } catch (err) {
      console.error("Erro ao registrar a base da ficha")
      throw err
    }
  }

  async RegisterDetalhesFicha(data, token) {
    try {
      const response = await fetch("/Ficha/RegisterDetalhesFicha", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          DetIdFicha: parseInt(data.detIdFicha),
          DetVariacao: data.detVariacao,
          DetCarga: data.detCarga,
          DetSerie: data.detSerie,
          DetRepeticao: data.detRepeticao,
          DetTreino: data.detTreino,
          DetDataAdicionado: data.detDataAdicionado
        })
      })
      const result = await response.json();
       if (result.message === "Não autorizado") {
            alert("Sessão expirada faça login novamente!")
            localStorage.clear()
            window.location.href = "/"
          }

      return result
    }
    catch (err) {
      console.error("Erro ao registrar os detalhes da ficha")
      throw err
    }
  }

  async UpdateCampoFicha(data, token) {
    try {
      const response = await fetch("/Ficha/UpdateCampoFicha", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          DetCampo: data.detCampo,
          DetValor: data.valor,
          DetId: parseInt(data.detId),
          DetDataAdicionado: data.detDataAdicionado
        }),
      });
      const result = await response.json();
       if (result.message === "Não autorizado") {
            alert("Sessão expirada faça login novamente!")
            localStorage.clear()
            window.location.href = "/"
          }

      return result;
    } catch (err) {
      console.error("Erro ao atualiza o campo da ficha")
      throw err
    }
  }

  async DeleteCampoFicha(data, token) {
    try {
      const response = await fetch("/Ficha/DeleteCampoFicha", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `${token}` },
        body: JSON.stringify({
          DetId: parseInt(data.detId),
        }),
      });
      const result = await response.json();
       if (result.message === "Não autorizado") {
            alert("Sessão expirada faça login novamente!")
            localStorage.clear()
            window.location.href = "/"
          }

      return result;
    } catch (err) {
      console.error("Erro ao Deletar o campo da ficha")
      throw err
    }
  }
}