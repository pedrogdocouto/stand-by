$(document).ready(function () {
    ConfigurarSeletorData($('.date'), new Date().toLocaleDateString());
    DesabilitarTecla($(document));
    ValidarPreenchimento($('#submit-cliente'));
});

let feedbackCnpj = $('#feedback-cnpj');

function FinalizarEdicao(xhr) {
    AlternarExibicao($('#submit-cliente'), 'block');
    let resultado = JSON.parse(xhr.responseText);

    if (resultado[0]) {
        InserirNotificacao('Sucesso', resultado[1], 1);

        setTimeout(function () {
            RedirecionaUsuario(`/Empresa/Gerenciamento?idEmpresa=${$('#vinculo-cliente').val()}`);
        }, 3000);
    }
    else {
        InserirNotificacao('Falha', resultado[1], 2);
    }
}

function ValidarCadastro(xhr) {
    let resultado = JSON.parse(xhr.responseText);

    if (resultado[0]) {
        // RedirecionaUsuario('/Empresa/Endereco');
    }
    else {
        InserirNotificacao('Falha', resultado[1], 2);
    }
}

function ValidarPreenchimento(submit) {
    let cnpj = $('#cnpj').val();
    let razaoSocial = $('#razao-social').val();
    let nomeFantasia = $('#nome-fantasia').val();
    let inscricaoEstadual = $('#inscricao-estadual').val();

    if (razaoSocial !== '' && cnpj !== '' && cnpj.length === 18 &&
        nomeFantasia !== '' && inscricaoEstadual !== '' && inscricaoEstadual.length > 8) {
        if (ValidarCnpj(cnpj)) {
            feedbackCnpj.css('display', 'none');
            submit.attr('disabled', false);
        }
        else {
            feedbackCnpj.css('display', 'block');
            submit.attr('disabled', true);
        }
    }
    else {
        submit.attr('disabled', true);
    }
}