class DashboardServices {

    async ReadIdAtendimentos(idAcademia) {
        const response = await fetch("/Dashboard", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                idAcademia,
                acao: "ReadIdAtendimentos"
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

}