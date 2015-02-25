document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var vDia = new Date();
    var vDif = (vDia.getDay() + 5) % 7;
    vDia = new Date(vDia - vDif * 24 * 60 * 60 * 1000);
    vDia.setHours(0, 0, 0);

    var vStrDia = vDia.getDate() + "/" + ("0" + (vDia.getMonth() + 1)).slice(-2) + "/" + vDia.getFullYear();



    //$.mobile.changePage($("#pagMain"), {
    //    changeHash: false,
    //    transition: "slideup"
    //});

}

$(function () {
    fnCarregarDropdownClasses("#ddlClasse1");
    fnCarregarDropdownClasses("#ddlClasse2");
    fnCarregarDropdownClasses("#ddlClasse3");

    var vMainConteudo = $("#divMainContent");

    var vAnoitecer = fnCriarGrupo("Anoitecer");
    vAnoitecer.AdicionarLinha(null, 0, null, 0, 'Anoitecer', 30);
    vMainConteudo.append(vAnoitecer);

    var vSemanal = fnCriarGrupo("Semanal");
    vSemanal.AdicionarLinha('Semanal', 24, 'Semanal', 28, 'Semanal', 30);
    vMainConteudo.append(vSemanal);

    var vAtheon = fnCriarGrupo("Câmara de Cristal");
    vAtheon.AdicionarLinha('Baú da Espira', 0, 'AtheonEspira', 26, null, 30);
    vAtheon.AdicionarLinha('Oráculos', 0, 'AtheonOraculos', 26, 'AtheonOraculos', 30);
    vAtheon.AdicionarLinha('Templário', 0, 'AtheonTemplario', 26, 'AtheonTemplario', 30);
    vAtheon.AdicionarLinha('Teletransporte', 0, 'AtheonTeletransporte', 26, 'AtheonTeletransporte', 30);
    vAtheon.AdicionarLinha('Górgonas 1', 0, 'AtheonGorgonas1', 26, 'AtheonGorgonas1', 30);
    vAtheon.AdicionarLinha('Górgonas 2', 0, 'AtheonGorgonas2', 26, 'AtheonGorgonas2', 30);
    vAtheon.AdicionarLinha('Portais', 0, 'AtheonPortais', 26, 'AtheonPortais', 30);
    vAtheon.AdicionarLinha('Atheon', 0, 'Atheon', 26, 'Atheon', 30);
    vMainConteudo.append(vAtheon);

    var vCrota = fnCriarGrupo("O Fim de Crota");
    vCrota.AdicionarLinha('Baú no Abismo', 0, 'CrotaBau1', 30, null, 33);
    vCrota.AdicionarLinha('O Abismo', 0, 'CrotaAbismo', 30, 'CrotaAbismo', 33);
    vCrota.AdicionarLinha('A Ponte', 0, 'CrotaPonte', 30, 'CrotaPonte', 33);
    vCrota.AdicionarLinha('Baú do Corredor', 0, 'CrotaBau2', 30, null, 33);
    vCrota.AdicionarLinha('Cantora da Morte', 0, 'CrotaBruxa', 30, null, 33);
    vCrota.AdicionarLinha('Crota', 0, 'Crota', 30, 'Crota', 33);
    vMainConteudo.append(vCrota);

    vMainConteudo.trigger('create');

});

function fnCarregarDropdownClasses(aDDL) {
    aDDL = $(aDDL);

    aDDL.empty();

    aDDL.append($('<option>', {
        value: '',
        text: 'Classe:'
    }).attr('data-placeholder', 'true'));

    aDDL.append($('<option>', {
        value: 'T',
        text: 'Titã'
    }));

    aDDL.append($('<option>', {
        value: 'C',
        text: 'Caçador'
    }));

    aDDL.append($('<option>', {
        value: 'A',
        text: 'Arcano'
    }));

}

function fnCriarGrupo(aTitulo) {
    var vGrupo = $("<div>");
    vGrupo.css('margin-top', '20px');

    var vHeader = $("<div>");
    vHeader.addClass("ui-bar ui-bar-a");
    vHeader.html('<h3>' + aTitulo + '</h3>');
    vGrupo.append(vHeader);

    vGrupo.Conteudo = $("<div>");
    vGrupo.Conteudo.addClass('ui-body ui-body-a');
    vGrupo.append(vGrupo.Conteudo);

    vGrupo.AdicionarLinha = function (aTexto1, aNivel1, aTexto2, aNivel2, aTexto3, aNivel3)
    {
        var vLinha = $("<div>");

        vLinha.append(fnCriarColuna(aTexto1, aNivel1));
        vLinha.append(fnCriarColuna(aTexto2, aNivel2));
        vLinha.append(fnCriarColuna(aTexto3, aNivel3));

        vGrupo.Conteudo.append(vLinha);
    }

    

    return vGrupo;
}

function fnCriarColuna(aTexto, aNivel) {
    var vColuna = $("<div>");
    vColuna.addClass("div3Colunas");

    if (aTexto == null)
        vColuna.html("&nbsp;");
    else
    {
        if (aNivel == 0)
        {
            vColuna.css('text-align', 'left');
            vColuna.css('font-size', '0.8em');
            vColuna.html(aTexto);
        }
        else
        {
            var vFlip = $("<select>", { id: 'chk' + aTexto + aNivel });
            vFlip.append('<option value="0">' + aNivel + '</option>')
            vFlip.append('<option value="1">' + aNivel + '</option>')
            vFlip.attr('data-role', "flipswitch");
            //vFlip.attr('data-on-text', aNivel);
            //vFlip.attr('data-off-text', aNivel);
            //vFlip.attr('data-wrapper-class', "custom-label-flipswitch");
            vFlip.attr('data-mini', "true");
            vFlip.change(fnFlipOnChangeEvent);
            vColuna.append(vFlip);
        }
            
    }

    return vColuna;
}

function fnFlipOnChangeEvent()
{
    fnFlipChange(this);
}

function fnFlipChange(aFlip)
{
    aFlip = $(aFlip);

    var vTriggerID = aFlip.attr('id');
    var vLenTrigger = vTriggerID.length;
    var vNivelTrigger = vTriggerID.substring(vLenTrigger - 2) * 1;

    var vIDOutro;
    var vLenOutro;
    var vNivelOutro;

    var vOutrosFlips = $('[id^="' + vTriggerID.substring(0, vLenTrigger - 2) + '"]').not(aFlip);
    vOutrosFlips.each(function () {
        vIDOutro = $(this).attr('id');
        vLenOutro = vIDOutro.length;
        vNivelOutro = vIDOutro.substring(vLenOutro - 2) * 1;

        if ((vNivelOutro < vNivelTrigger) && ($(this).val() == "0"))
            $(this).val("1").flipswitch('refresh');

        if ((vNivelOutro > vNivelTrigger) && ($(this).val() == "1")) 
            aFlip.val("1").flipswitch('refresh');


    });

}



function fnConfigChars() {
    $.mobile.changePage($("#pagConfigChars"), { transition: "flip" });
}

function fnSaveChars() {
    $.mobile.changePage($("#pagMain"), { transition: "flip" });
}