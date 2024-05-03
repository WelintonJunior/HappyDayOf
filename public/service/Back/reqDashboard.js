class DashboardServices {

    async ReadSatisfacao(idAcademia) {
        const response = await fetch("/DashBoard/ReadSatisfacao", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                IdAcad: parseInt(idAcademia),
            })
        })
        const result = await response.json();
        return result
    }

    async ReadAtendimentos(idAtendimento) {
        const response = await fetch("/DashBoard/ReadAtendimentos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                AteId: parseInt(idAtendimento),
            })
        })
        const result = await response.json();
        return result
    }

    async ReadFuncNome(idFuncionario) {
        const response = await fetch("/DashBoard/ReadFuncNome", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                FunId: parseInt(idFuncionario),
            })
        })
        const result = await response.json();
        return result
    }

    async ReadAllAtendimentos(idAcademia) {
        const response = await fetch("/DashBoard/ReadAllAtendimentos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                IdAcad: parseInt(idAcademia),
            })
        })
        const result = await response.json();
        return result
    }

    async ReadAllEngajamentos(idAcademia) {
        const response = await fetch("/DashBoard/ReadAllEngajamentos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                IdAcad : parseInt(idAcademia),
            })
        })
        const result = await response.json();
        return result
    }

}