const dados = JSON.parse(localStorage.getItem("dados"));
console.log(dados);

//Form Create Academia

// document
//   .getElementById("formAcademia")
//   .addEventListener("submit", async (e) => {
//     e.preventDefault();
//     const fd = new FormData(e.target);
//     const data = Object.fromEntries(fd.entries());

//     const response = await fetch("http://localhost:3000/Equipe", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         acao: "CreateAcademia",
//         data,
//       }),
//     });

//     const result = await response.json();
//     console.log(result);
//   });
