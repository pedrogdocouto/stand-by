$(document).ready(function () {
    $('.cnpj').mask('00.000.000/0000-00');
    $('.data').mask('00/00/0000');
    $('.moeda').mask('000.000.000.000,00', {reverse: true}); 
});