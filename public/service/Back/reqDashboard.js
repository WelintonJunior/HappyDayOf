class DashboardServices {

    async ReadSatisfacao(idAcademia, token) {
        const response = await fetch("/DashBoard/ReadSatisfacao", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `${token}` },
            body: JSON.stringify({
                IdAcad: parseInt(idAcademia),
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

    async ReadAtendimentos(idAtendimento, token) {
        const response = await fetch("/DashBoard/ReadAtendimentos", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `${token}` },
            body: JSON.stringify({
                AteId: parseInt(idAtendimento),
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

    async ReadFuncNome(idFuncionario, token) {
        const response = await fetch("/DashBoard/ReadFuncNome", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `${token}` },
            body: JSON.stringify({
                FunId: parseInt(idFuncionario),
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

    async ReadAllAtendimentos(idAcademia, token) {
        const response = await fetch("/DashBoard/ReadAllAtendimentos", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `${token}` },
            body: JSON.stringify({
                IdAcad: parseInt(idAcademia),
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

    async ReadAllEngajamentos(idAcademia, token) {
        const response = await fetch("/DashBoard/ReadAllEngajamentos", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `${token}` },
            body: JSON.stringify({
                IdAcad: parseInt(idAcademia),
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
    
    async ReadAllClientes(idAcademia, token) {
        const response = await fetch("/Dashboard/CountClientes", {
            headers: { "Content-Type": "application/json", "Authorization": `${token}` },
            method: "POST",
            body: JSON.stringify({
                IdAcad: parseInt(idAcademia)
            })
        })

        const result = await response.json();
        return result
    }


}