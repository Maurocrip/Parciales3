"use strict";
$(function () {
    VerificarJWT();
    $("#verificarJWT").on("click", function () {
        VerificarJWT();
    });
    $("#logout").on("click", function () {
        LogOut();
    });
});
function VerificarJWT() {
    var jwt = localStorage.getItem("jwt");
    $.ajax({
        type: 'GET',
        url: "http://localhost:9854/verificar_token",
        dataType: "json",
        data: {},
        headers: { 'Authorization': 'Bearer ' + jwt },
        async: true
    })
        .done(function (obj_rta) {
        if (obj_rta.exito) {
            var mensaje = JSON.stringify(obj_rta.payloud);
            $("#divResultado").html(mensaje);
        }
        else {
            console.log("hola");
            alert("hola");
        }
    })
        .fail(function (jqXHR, textStatus, errorThrown) {
        var retorno = JSON.parse(jqXHR.responseText);
        console.log(retorno.mensaje);
        alert(retorno.mensaje);
        if (retorno.mensaje === "El JWT NO es válido!!!") {
            $(location).attr('href', "http://localhost/parciales/modelos/modelo_parcial_laboratorio/modelo%202parcial/codigo/index.html");
        }
    });
}
function LogOut() {
    localStorage.removeItem("jwt");
    $(location).attr('href', "http://localhost/parciales/modelos/modelo_parcial_laboratorio/modelo%202parcial/codigo/index.html");
}
//# sourceMappingURL=principal.js.map