/// <reference path="./node_modules/@types/jquery/index.d.ts" />


$(()=>{

    $("#btnForm").on("click", (e:any)=>{

        e.preventDefault();

        let legajo = $("#legajo").val();
        let apellido = $("#apellido").val();

        let dato:any = {};
        dato.legajo = legajo;
        dato.apellido = apellido;

        $.ajax({
            type: 'POST',
            url: "http://localhost:9854/login",
            dataType: "json",
            data: dato,
            async: true
        })
        .done(function (obj_ret:any) {

            if(obj_ret.exito){
                //GUARDO EN EL LOCALSTORAGE
                localStorage.setItem("jwt", obj_ret.jwt);                

                $(location).attr('href', "http://localhost/parciales/modelos/modelo_parcial_laboratorio/modelo%202parcial/codigo/principal.html");
                /*
                setTimeout(() => {
                    $(location).attr('href', "http://localhost/parciales/modelos/modelo_parcial_laboratorio/modelo%202parcial/codigo/principal.html");
                }, 2000);
                //el setTimeout es para simular una carga*/

            }
            else
            {
                console.log(obj_ret.mensaje);
                alert(obj_ret.mensaje);
            }          
        })
        .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

            let retorno = JSON.parse(jqXHR.responseText);

            console.log(retorno.mensaje);
            alert(retorno.mensaje);
        });    

    });

});

