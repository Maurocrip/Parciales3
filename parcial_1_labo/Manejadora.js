"use strict";
var ModeloParcial;
(function (ModeloParcial) {
    var xhttp = new XMLHttpRequest();
    var formData = new FormData();
    var Manejadora = (function () {
        function Manejadora() {
        }
        Manejadora.AgregarNeumaticoJSON = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = (Number)(document.getElementById("precio").value);
            xhttp.open("POST", "/parcial_uno/backend/altaNeumaticoJSON.php", true);
            formData.append('marca', marca);
            formData.append('medidas', medidas);
            formData.append('precio', precio.toString());
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarNeumaticosJSON = function () {
            xhttp.open("GET", "/parcial_uno/backend/listadoNeumaticosJSON.php", true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    var objet = JSON.parse(xhttp.responseText);
                    var tabla = " <TABLE BORDER><TR><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH></TR>";
                    for (var index = 0; index < objet.length; index++) {
                        tabla += "<TR><TD>".concat(objet[index]._marca, "</TD> <TD>").concat(objet[index]._medidias, "</TD> <TD>").concat(objet[index]._precio, "</TD> </TR>");
                    }
                    tabla += "</TABLE>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.VerificarNeumaticoJSON = function () {
            xhttp.open("POST", "/parcial_uno/backend/verificarNeumaticoJSON.php", true);
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            formData.append('marca', marca);
            formData.append('medidas', medidas);
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.AgregarNeumaticoSinFoto = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = (Number)(document.getElementById("precio").value);
            xhttp.open("POST", "/parcial_uno/backend/agregarNeumaticoSinFoto.php", true);
            var neumatico = {
                marca: marca,
                medidas: medidas,
                precio: precio
            };
            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarNeumaticosBD = function () {
            xhttp.open("GET", "/parcial_uno/backend/listadoNeumaticoBD.php", true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    var objet = JSON.parse(xhttp.responseText);
                    var tabla_1 = " <TABLE BORDER><TR><TH>id</TH><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH> <TH>PATH FOTO</TH>  <TH>FOTO</TH></TR>";
                    objet.forEach(function (element) {
                        tabla_1 += "<tr><td> ".concat(element.id, "</td><td> ").concat(element.marca, " </td><td> ").concat(element.medidas, " </td><td> ").concat(element.precio, " </td><td> ").concat(element.foto, " </td><td> <img src=\"").concat(element.foto, "\" width=\"50\" height=\"50\" /> </td></tr>");
                    });
                    tabla_1 += "</TABLE>";
                    document.getElementById("divTabla").innerHTML = tabla_1;
                    document.getElementById("idNeumatico").readOnly = false;
                }
            };
        };
        Manejadora.ModificarNeumatico = function () {
            var funccion = new Manejadora();
            funccion.ModificarNeumatico();
        };
        Manejadora.EliminarNeumatico = function () {
            var funccion = new Manejadora();
            funccion.EliminarNeumatico();
        };
        Manejadora.prototype.EliminarNeumatico = function () {
            xhttp.open("POST", "/parcial_uno/backend/eliminarNeumaticoBD.php", true);
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = (Number)(document.getElementById("precio").value);
            var id = (Number)(document.getElementById("idNeumatico").value);
            if (window.confirm("Seguro quieres eliminar el neumatico marcca: " + marca + " medida: " + medidas)) {
                var neumatico = {
                    marca: marca,
                    medidas: medidas,
                    precio: precio,
                    id: id
                };
                formData.append('neumatico_json', JSON.stringify(neumatico));
                xhttp.send(formData);
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log(xhttp.responseText);
                        alert(xhttp.responseText);
                        Manejadora.MostrarNeumaticosBD();
                    }
                };
            }
        };
        Manejadora.prototype.ModificarNeumatico = function () {
            xhttp.open("POST", "/parcial_uno/backend/modificarNeumaticoBD.php", true);
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = (Number)(document.getElementById("precio").value);
            var id = (Number)(document.getElementById("idNeumatico").value);
            var neumatico = {
                marca: marca,
                medidas: medidas,
                precio: precio,
                id: id
            };
            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var objet = JSON.parse(xhttp.responseText);
                    if (objet.exito) {
                        Manejadora.MostrarNeumaticosBD();
                    }
                    else {
                        console.log(objet.mensaje);
                        alert(objet.mensaje);
                    }
                }
            };
        };
        return Manejadora;
    }());
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map