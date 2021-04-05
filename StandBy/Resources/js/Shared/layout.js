$(document).ready(function () {
    $.fn.selectpicker.Constructor.BootstrapVersion = '4';

    InserirDica($('.balao-dica'));
});

let notificacao = {
    fundo: {
        cor: '#343a40'
    },
    icone: {
        cor: '#ffffff',
        classe: 'fas fa-lightbulb'
    },
    mensagem: {
        cor: '#ffffff',
        espacamento: '20',
        tamanho: '15',
        texto: 'Teste de notificação concluído com sucesso.'
    },
    progresso: {
        cor: '#f8f9fa',
        easing: 'linear',
        habilitado: true
    },
    tempo: 2500,
    titulo: {
        cor: '#ffffff',
        espacamento: '20',
        tamanho: '15',
        texto: 'Concluído'
    }
};

function AlternarExibicao(elemento, valor) {
    elemento.css('display', valor);
}

function ConfigurarGrafico(elemento, conexao) {
    am4core.ready(function () {
        am4core.useTheme(am4themes_animated);
        let grafico = am4core.create(elemento, am4charts.XYChart3D);
        let eixoCategoria = grafico.yAxes.push(new am4charts.CategoryAxis());
        let eixoValor = grafico.xAxes.push(new am4charts.ValueAxis());
        let series = grafico.series.push(new am4charts.ColumnSeries3D());

        grafico.data = [{
            status: '24 horas ou mais',
            quantidade: conexao[6],
            cor: am4core.color('#343a40')
        }, {
            status: '16 a 24 horas',
            quantidade: conexao[5],
            cor: am4core.color('#8b0000')
        }, {
            status: '12 a 16 horas',
            quantidade: conexao[4],
            cor: am4core.color('#be0000')
        }, {
            status: '8 a 12 horas',
            quantidade: conexao[3],
            cor: am4core.color('#e6c200')
        }, {
            status: '6 a 8 horas',
            quantidade: conexao[2],
            cor: am4core.color('#ffd700')
        }, {
            status: '2 a 6 horas',
            quantidade: conexao[1],
            cor: am4core.color('#006400')
        }, {
            status: '0 a 2 horas',
            quantidade: conexao[0],
            cor: am4core.color('#009700')
        }];

        eixoCategoria.dataFields.category = 'status';
        eixoCategoria.renderer.grid.template.disabled = false;
        eixoCategoria.renderer.labels.template.disabled = true;
        eixoValor.renderer.grid.template.strokeWidth = 0;
        eixoValor.renderer.labels.template.disabled = false;
        series.name = 'Conexão dos rastreadores';
        series.columns.template.tooltipText = '{name}\nIntervalo: {categoryY}\nQuantidade: {valueX}';
        series.columns.template.strokeWidth = 0;
        series.columns.template.propertyFields.fill = 'cor';
        series.dataFields.categoryY = 'status';
        series.dataFields.valueX = 'quantidade';
        grafico.logo.__disabled = true;

        series.columns.template.events.on('hit', function (e) {
            switch (e.target.properties.readerTitle.substring(0, 2).trim()) {
                case '0':
                    window.open(`/Conexao/Lista/${0}`);
                    break;
                case '2':
                    window.open(`/Conexao/Lista/${1}`);
                    break;
                case '6':
                    window.open(`/Conexao/Lista/${2}`);
                    break;
                case '8':
                    window.open(`/Conexao/Lista/${3}`);
                    break;
                case '12':
                    window.open(`/Conexao/Lista/${4}`);
                    break;
                case '16':
                    window.open(`/Conexao/Lista/${5}`);
                    break;
                case '24':
                    window.open(`/Conexao/Lista/${6}`);
                    break;
            }
        });
    });
}

function ConfigurarNotificacao(notificacao) {
    iziToast.show({
        id: null,
        class: '',
        title: notificacao.titulo.texto,
        titleColor: notificacao.titulo.cor,
        titleSize: notificacao.titulo.tamanho,
        titleLineHeight: notificacao.titulo.espacamento,
        message: notificacao.mensagem.texto,
        messageColor: notificacao.mensagem.cor,
        messageSize: notificacao.mensagem.tamanho,
        messageLineHeight: notificacao.mensagem.espacamento,
        backgroundColor: '',
        theme: 'light',
        color: notificacao.fundo.cor,
        icon: notificacao.icone.classe,
        iconText: '',
        iconColor: notificacao.icone.cor,
        iconUrl: null,
        image: '',
        imageWidth: 50,
        maxWidth: 750,
        zindex: null,
        layout: 2,
        balloon: false,
        close: false,
        closeOnEscape: false,
        closeOnClick: true,
        displayMode: 'replace',
        position: 'topCenter',
        target: '',
        targetFirst: true,
        timeout: notificacao.tempo,
        rtl: false,
        animateInside: true,
        drag: true,
        pauseOnHover: true,
        resetOnHover: false,
        progressBar: notificacao.progresso.habilitado,
        progressBarColor: notificacao.progresso.cor,
        progressBarEasing: notificacao.progresso.easing,
        overlay: false,
        overlayClose: false,
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        transitionIn: 'bounceInDown',
        transitionOut: 'fadeOutDown',
        transitionInMobile: 'fadeInUp',
        transitionOutMobile: 'fadeOutDown'
    });
}

function ConfigurarSeletor(elemento, titulo, busca, capitalize) {
    let estilo = capitalize ? 'text-capitalize' : '';

    elemento.selectpicker({
        container: 'body',
        deselectAllText: 'Desmarcar todos',
        liveSearch: busca,
        liveSearchNormalize: false,
        liveSearchPlaceholder: 'Buscar',
        liveSearchStyle: 'contains',
        noneResultsText: 'Nenhum resultado com {0}',
        noneSelectedText: 'Nenhum item selecionado',
        selectAllText: 'Marcar todos',
        selectedTextFormat: 'count',
        selectOnTab: true,
        showSubtext: true,
        showTick: true,
        size: 8,
        style: estilo,
        title: titulo,
        width: '100%'
    });
}

function ConfigurarSeletorData(elemento, dataMaxima = '31/12/9999') {
    elemento.datepicker({
        autoclose: true,
        clearBtn: true,
        daysOfWeekHighlighted: '0',
        endDate: dataMaxima,
        format: 'dd/mm/yyyy',
        language: 'pt-BR',
        showWeekDays: true,
        startDate: '01/01/1000',
        templates: {
            leftArrow: '<i class="fas fa-arrow-left"></i>',
            rightArrow: '<i class="fas fa-arrow-right"></i>'
        },
        todayHighlight: true
    });
}

function ConfigurarTabela(tabela, entidade, modulo, colunas) {
    tabela.DataTable({
        dom: 'lBftrip',
        buttons: {
            buttons: [
                {
                    className: 'btn btn-sm btn-outline-info',
                    exportOptions: {
                        columns: colunas
                    },
                    extend: 'copy',
                    text: 'Copiar'
                },
                {
                    className: 'btn btn-sm btn-outline-info',
                    exportOptions: {
                        columns: colunas
                    },
                    extend: 'excel',
                    filename: `${modulo} - ${entidade}`,
                    messageTop: `Relatório registrado em ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`,
                    sheetName: modulo,
                    text: 'Exportar',
                    title: `Relatório de ${entidade}`
                },
                {
                    className: 'btn btn-sm btn-outline-info',
                    exportOptions: {
                        columns: colunas
                    },
                    messageTop: `Relatório registrado em ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`,
                    text: 'Imprimir', extend: 'print',
                    title: `Relatório de ${entidade}`
                },
                {
                    className: 'btn btn-sm btn-outline-info',
                    exportOptions: {
                        columns: colunas
                    },
                    extend: 'pdf',
                    filename: `${modulo} - ${entidade}`,
                    messageTop: `Relatório registrado em ${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`,
                    text: 'Salvar',
                    title: `Relatório de ${entidade}`
                }
            ],
            dom: {
                button: {
                    className: 'btn'
                }
            }
        },
        deferRender: true,
        lengthChange: true,
        lengthMenu: [25, 50, 75, 100],
        order: [[0, 'asc']],
        pageLength: 25,
        pagingType: 'numbers',
        processing: true,
        select: true,
        scrollCollapse: true,
        scrollX: true,
        scrollY: 500,
        language: {
            buttons: {
                copyTitle: 'Registros copiados para área de transferência',
                copySuccess: { _: '%d linhas copiadas', 1: '1 linha copiada' }
            },
            decimal: ',',
            emptyTable: 'Não foram encontrados registros',
            info: 'Exibindo _START_ a _END_ de _TOTAL_ registros',
            infoEmpty: 'Exibindo 0 registros',
            infoFiltered: '(filtrado de _MAX_ registros totais)',
            infoPostFix: '',
            lengthMenu: 'Exibir _MENU_ registros',
            loadingRecords: 'Carregando',
            paginate: {
                first: 'Primeira',
                last: 'Última',
                next: 'Próxima',
                previous: 'Anterior'
            },
            processing: 'Processando',
            search: ' ',
            searchPlaceholder: 'Buscar nos registros',
            thousands: '.',
            zeroRecords: 'Não foram encontrados registros'
        }
    });
}

function DesabilitarTecla(elemento) {
    elemento.keypress(
        function (event) {
            if (event.which === 13) {
                event.preventDefault();
            }
        }
    );
}

function IdentificarNavegador() {
    let navegadorUsuario, agente = navigator.userAgent;

    if (agente.indexOf('Firefox') > -1) {
        navegadorUsuario = 'Mozilla Firefox';
    }
    else if (agente.indexOf('SamsungBrowser') > -1) {
        navegadorUsuario = 'Samsung Internet';
    }
    else if (agente.indexOf('Opera') > -1 || agente.indexOf('OPR') > -1) {
        navegadorUsuario = 'Opera';
    }
    else if (agente.indexOf('Trident') > -1) {
        navegadorUsuario = 'Internet Explorer';
    }
    else if (agente.indexOf('Edge') > -1) {
        navegadorUsuario = 'Microsoft Edge';
    }
    else if (agente.indexOf('Chrome') > -1) {
        navegadorUsuario = 'Google Chrome';
    }
    else if (agente.indexOf('Safari') > -1) {
        navegadorUsuario = 'Safari';
    }
    else {
        navegadorUsuario = 'Desconhecido';
    }

    return navegadorUsuario;
}

function InserirNotificacao(titulo, mensagem, tipo, tempo = 2500) {
    switch (tipo) {
        case 1:
            notificacao.fundo.cor = '#006400';
            notificacao.icone.cor = '#ffffff';
            notificacao.icone.classe = 'fas fa-check-circle';
            notificacao.mensagem.cor = '#ffffff';
            notificacao.mensagem.texto = mensagem;
            notificacao.progresso.cor = '#dfecdf';
            notificacao.tempo = tempo;
            notificacao.titulo.cor = '#ffffff';
            notificacao.titulo.texto = titulo;
            break;
        case 2:
            notificacao.fundo.cor = '#8b0000';
            notificacao.icone.cor = '#ffffff';
            notificacao.icone.classe = 'fas fa-times-circle';
            notificacao.mensagem.cor = '#ffffff';
            notificacao.mensagem.texto = mensagem;
            notificacao.progresso.cor = '';
            notificacao.tempo = tempo;
            notificacao.titulo.cor = '#f1dfdf';
            notificacao.titulo.texto = titulo;
            break;
        case 3:
            notificacao.fundo.cor = '#ffd700';
            notificacao.icone.cor = '#000000';
            notificacao.icone.classe = 'fas fa-exclamation-circle';
            notificacao.mensagem.cor = '#000000';
            notificacao.mensagem.texto = mensagem;
            notificacao.progresso.cor = '#9f8600';
            notificacao.tempo = tempo;
            notificacao.titulo.cor = '#000000';
            notificacao.titulo.texto = titulo;
            break;
        case 4:
            notificacao.fundo.cor = '#17a2b8';
            notificacao.icone.cor = '#ffffff';
            notificacao.icone.classe = 'fas fa-info-circle';
            notificacao.mensagem.cor = '#ffffff';
            notificacao.mensagem.texto = mensagem;
            notificacao.progresso.cor = '#c5e8ed';
            notificacao.tempo = tempo;
            notificacao.titulo.cor = '#ffffff';
            notificacao.titulo.texto = titulo;
            break;
    }

    ConfigurarNotificacao(notificacao);
}

function InserirDica(elemento) {
    elemento.tooltip({
        delay: {
            hide: 1200
        },
        boundary: 'window'
    });
}

function RedirecionaUsuario(pagina) {
    window.location.replace(pagina);
}

function TratarSituacao(entidade, situacao) {
    switch (situacao)
    {
        case '0':
            if (entidade === 4) {
                return 'Ativa';
            }
            else {
                return 'Ativo';
            }
        case '1':
            if (entidade === 4) {
                return 'Bloqueada';
            }
            else {
                return 'Bloqueado';
            }
        case '2':
            if (entidade === 4) {
                return 'Inativa';
            }
            else {
                return 'Inativo';
            }
        case '3':
            return 'Pendente';
        case '4':
            if (entidade === 1 || entidade === 3 || entidade === 6 || entidade === 8) {
                return 'Sinistrado';
            }
            else {
                return '';
            }
        case '5':
            if (entidade === 1 || entidade === 3 || entidade === 6) {
                return 'Estoque';
            }
            else {
                return '';
            }
        case '6':
            if (entidade === 1 || entidade === 3 || entidade === 6) {
                return 'Garantia';
            }
            else {
                return '';
            }
        case '7':
            if (entidade === 1 || entidade === 3 || entidade === 6) {
                return 'Teste';
            }
            else {
                return '';
            }
        case '8':
            if (entidade === 1) {
                return 'Fornecedora';
            }
            else {
                return '';
            }
        default:
            return 'Indefinida';
    }
}

function ValidarCnpj(valor) {
    if (valor.length === 18) {
        let cnpj = valor.trim();
        let v1 = 0;
        let v2 = 0;
        let aux = false;

        cnpj = cnpj.replace(/\./g, '');
        cnpj = cnpj.replace('-', '');
        cnpj = cnpj.replace('/', '');
        cnpj = cnpj.split('');

        for (let i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] !== cnpj[i]) {
                aux = true;
            }
        }

        if (aux === false) {
            return false;
        }

        for (let i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            }
            else {
                v1 += cnpj[i] * p2;
            }
        }

        v1 = (v1 % 11);

        if (v1 < 2) {
            v1 = 0;
        }
        else {
            v1 = (11 - v1);
        }

        if (v1.toString() !== cnpj[12]) {
            return false;
        }

        for (let i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            }
            else {
                v2 += cnpj[i] * p2;
            }
        }

        v2 = (v2 % 11);

        if (v2 < 2) {
            v2 = 0;
        }
        else {
            v2 = (11 - v2);
        }

        return v2.toString() === cnpj[13];
    }

    return false;
}

function ValidarCpf(valor) {
    if (valor.length === 14) {
        let cpf = valor.trim();
        let v1 = 0;
        let v2 = 0;
        let aux = false;

        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
        cpf = cpf.split('');

        for (let i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] !== cpf[i]) {
                aux = true;
            }
        }

        if (aux === false) {
            return false;
        }

        for (let i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
        }

        v1 = ((v1 * 10) % 11);

        if (v1 === 10) {
            v1 = 0;
        }

        if (v1.toString() !== cpf[9]) {
            return false;
        }

        for (let i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
        }

        v2 = ((v2 * 10) % 11);

        if (v2 === 10) {
            v2 = 0;
        }

        return v2.toString() === cpf[10];
    }

    return false;
}

(function () {
    'use strict';
    window.addEventListener('load', function () {
        const forms = document.getElementsByClassName('validacao');
        Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();