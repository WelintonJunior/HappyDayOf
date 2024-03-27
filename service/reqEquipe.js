//Form Create Academia

document.getElementById('formAcademia').addEventListener('submit', handleSubmitFormAcademia)

async function handleSubmitFormAcademia(e) {
    e.preventDefault();
    const fd = new FormData(e.target)
    const data = Object.fromEntries(fd.entries())

    const response = await fetch("http://localhost:3000/Equipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            acao: "CreateAcademia",
            data,
        })
    })

    const result = await response.json()
    console.log(result)
}


//Form Create Cliente

// document.getElementById('formCliente').addEventListener('submit', handleSubmitFormCliente)

// async function handleSubmitFormCliente(e) {
//     e.preventDefault();
//     const fd = new FormData(e.target)
//     const data = Object.fromEntries(fd.entries())

//     const response = await fetch("/Cliente", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//             acao: "CreateCliente",
//             data,
//             idAcademia
//         })
//     })

//     const result = await response.json()
//     console.log(result)
// }