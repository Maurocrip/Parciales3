"use strict";
$(function () {
    $("#btnForm").on("click", function (e) {
        e.preventDefault();
        var legajo = $("#legajo").val();
        var apellido = $("#apellido").val();
        var dato = {};
        dato.legajo = legajo;
        dato.apellido = apellido;
        $.ajax({
            type: 'POST',
            url: "http://localhost:9854/login",
            dataType: "json",
            data: dato,
            async: true
        })
            .done(function (obj_ret) {
            if (obj_ret.exito) {
                localStorage.setItem("jwt", obj_ret.jwt);
                $(location).attr('href', "http://localhost/parciales/modelos/modelo_parcial_laboratorio/modelo%202parcial/codigo/principal.html");
            }
            else {
                console.log(obj_ret.mensaje);
                alert(obj_ret.mensaje);
            }
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
            var retorno = JSON.parse(jqXHR.responseText);
            console.log(retorno.mensaje);
            alert(retorno.mensaje);
        });
    });
});
//# sourceMappingURL=index.js.map