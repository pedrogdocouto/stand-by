$(document).ready(function () {
    ConfigurarTabela(
        $('#tabela-cliente'),
        'Empresas',
        [ 0, 1, 2, 3, 4, 5, 6 ]
    );

    $('#formulario-inativacao').on('submit', function () {
        $('#modal-inativacao').modal('hide');
    });
});

function Detalhamento(xhr) {
    let lista = JSON.parse(xhr.responseText);
    let dataFundacao = new Date(lista.dataFundacao);

    $('#titulo').html(lista.razaoSocial.toLowerCase());
    $('#cnpj').html($('.cnpj').masked(lista.cnpj));
    $('#contato').html(TratarContato(lista.contato));
    $('#data').html(dataFundacao.toLocaleDateString());
    $('#endereco').html(TratarEndereco(lista.endereco));
    $('#logo-empresa').attr('src', `/images/logo/${lista.logo}`);
    $('#matriz').html(lista.idMatriz == null ? 'Sim' : 'Não');
    $('#nome-fantasia').html(lista.nomeFantasia.toLowerCase());
    $('#situacao').html(TratarSituacao(4, lista.situacao));
    $('#modal-detalhamento').modal('show');
}

function FinalizarInativacao(xhr) {
    let resultado = JSON.parse(xhr.responseText);
    $('#modal-inativacao').modal('hide');

    if (resultado[0]) {
        InserirNotificacao('Sucesso', resultado[1], 1);

        setTimeout(function () {
            location.reload();
        }, 3000);
    }
    else {
        InserirNotificacao('Falha', resultado[1], 2);
    }
}

function TratarContato(lista) {
    let contato = '';

    $(lista).each(
        function (indice, c) {
            contato +=
                '<strong class="text-center text-capitalize">' +
                    `${c.nome.toLowerCase()} - ${c.departamento.toLowerCase()}` + 
                '</strong>' +
                '<small class="text-muted float-right">' +
                    TratarVinculo(c.vinculo) +
                '</small>' +
                '<br/><div>';

            if (c.telefone !== "") {
                contato += $('.celular').masked(c.telefone);

                if (c.email !== "") {
                    contato += '<br/>';
                }
            }

            if (c.email !== "") {
                contato += c.email;
            }

            if (indice === lista.length - 1) {
                contato +=
                    '</div>';
            }
            else {
                contato +=
                    '</div>' +
                    '<hr />';
            }
        }
    )

    return contato;
}

function TratarEndereco(lista) {
    let endereco = '';

    $(lista).each(
        function (indice, e) {
            endereco +=
                '<strong class="text-center text-capitalize">' +
                    `${e.logradouro.toLowerCase()}, ${e.numero}` +
                '</strong>' +
                '<small class="text-muted text-capitalize float-right">' +
                    e.descricao +
                '</small>' +
                '<br/><div class="text-capitalize">';

            endereco += (`${e.bairro}, ${e.cidade} - `).toLowerCase() + `${e.uf}<br/>` +
                `${$('.cep').masked(e.cep)}`;

            if (indice === lista.length - 1) {
                endereco +=
                    '</div>';
            }
            else {
                endereco +=
                    '</div>' +
                    '<hr />';
            }
        });

    return endereco;
}

function TratarVinculo(vinculo) {
    switch (vinculo) {
        case '0':
            return 'SEM REGISTRO';
        case '1':
            return 'PESSOAL';
        case '2':
            return 'PROFISSIONAL';
        case '3':
            return 'CÔNJUGE';
        case '4':
            return 'FAMÍLIA';
        case '5':
            return 'FUNCIONÁRIO';
        case '6':
            return 'EMPREGADOR';
        case '7':
            return 'CONHECIDO';
        default:
            return 'INDEFINIDO';
    }
}

function ValidarInativacao(empresa, objeto) {
    $('#id-empresa').val(empresa);
    $('#confirmacao').html(
        `<p class="text-center"><strong>Deseja realmente excluir a empresa<br>` +
            `<strong class="text-capitalize text-danger">${objeto}</strong> ?` +
        `</strong></p>`
    );
}