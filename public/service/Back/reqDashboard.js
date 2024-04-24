class DashboardServices {

    async ReadSatisfacao(idAcademia) {
        const response = await fetch("/Dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idAcademia,
                acao: "ReadSatisfacao"
            })
        })
        const result = await response.json();
        return result
    }

    async ReadAtendimentos(idAtendimento) {
        const response = await fetch("/Dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: idAtendimento,
                acao: "ReadAtendimentos"
            })
        })
        const result = await response.json();
        return result[0]
    }

    async ReadFuncNome(idFuncionario) {
        const response = await fetch("/Dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                data: idFuncionario,
                acao: "ReadFuncNome"
            })
        })
        const result = await response.json();
        return result[0]
    }

    async ReadAllAtendimentos(idAcademia) {
        const response = await fetch("/Dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idAcademia,
                acao: "ReadAllAtendimentos"
            })
        })
        const result = await response.json();
        return result
    }

    async ReadAllEngajamentos(idAcademia) {
        const response = await fetch("/Dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idAcademia,
                acao: "ReadAllEngajamentos"
            })
        })
        const result = await response.json();
        return result
    }

}