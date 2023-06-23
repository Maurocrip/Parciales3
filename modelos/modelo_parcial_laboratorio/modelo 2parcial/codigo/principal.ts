$(()=>{

    VerificarJWT();

    $("#verificarJWT").on("click", ()=>{

        VerificarJWT();
    });

    $("#logout").on("click", ()=>{

        LogOut();
    });

});

//#region PARTE 1

function VerificarJWT() {
    
    //RECUPERO DEL LOCALSTORAGE
    let jwt = localStorage.getItem("jwt");

    $.ajax({
        type: 'GET',
        url: "http://localhost:9854/verificar_token",
        dataType: "json",
        data: {},
        headers : {'Authorization': 'Bearer ' + jwt},
        async: true
    })
    .done(function (obj_rta:any) {

        if(obj_rta.exito){
            let mensaje: string = JSON.stringify(obj_rta.payloud);

            $("#divResultado").html(mensaje);
        }
        else{

            console.log("hola");
            alert("hola");
        }
    })
    .fail(function (jqXHR:any, textStatus:any, errorThrown:any) {

        let retorno = JSON.parse(jqXHR.responseText);

        console.log(retorno.mensaje);
        alert(retorno.mensaje);
        if(retorno.mensaje === "El JWT NO es válido!!!")
        {
            $(location).attr('href',"http://localhost/parciales/modelos/modelo_parcial_laboratorio/modelo%202parcial/codigo/index.html");
        }
    });    
}

function LogOut() {
    localStorage.removeItem("jwt");
    $(location).attr('href',"http://localhost/parciales/modelos/modelo_parcial_laboratorio/modelo%202parcial/codigo/index.html");
}

//#endregion