$(document).ready(function () {
    $('#menuCollapse').on('click', function () {
      console.log("Clicou no botão menuCollapse");
      $('#sidebar').toggleClass('active');
    });
  });
  