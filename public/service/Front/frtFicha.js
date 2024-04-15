document.querySelectorAll(".FichaCliente").forEach((element) => {
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    const idCliente = e.target.value;
    const result = await ReadFichaCliente(idAcademia, idCliente);
    console.log(result);
    //Colocar em alguma lista
  });
});

document.getElementById("FormFicha").addEventListener("submit", async (e) => {
  e.preventDefault();
  const fd = new FormData(e.target);
  const data = Object.fromEntries(fd.entries());
  const result = await RegisterFicha(idAcademia, data);
  console.log(result);
});

document
  .getElementById("FormFichaDetalhes")
  .addEventListener("submit", async (e) => {
    e.preventDefTelaFichaault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const result = await RegisterDetalhesFicha(data);
    console.log(result);
  });

document
  .getElementById("FormUpdateFichaDetalhes")
  .addEventListener("submit", async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const result = await UpdateDetalhesFicha(data);
    console.log(result);
  });
