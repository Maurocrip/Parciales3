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
            xhttp.open("POST", "./backend/altaNeumaticoJSON.php", true);
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
            xhttp.open("GET", "./backend/listadoNeumaticosJSON.php", true);
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
            xhttp.open("POST", "./backend/verificarNeumaticoJSON.php", true);
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
            xhttp.open("POST", "./backend/agregarNeumaticoSinFoto.php", true);
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
            xhttp.open("GET", "./backend/listadoNeumaticoBD.php", true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    var objet = JSON.parse(xhttp.responseText);
                    var tabla = " <TABLE BORDER><TR><TH>id</TH><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH> <TH>PATH FOTO</TH> <TH>FOTO</TH>  <TH>ACCIONES</TH></TR>";
                    for (var index = 0; index < objet.length; index++) {
                        tabla += "<TR><TD>".concat(objet[index].id, "</TD><TD>").concat(objet[index].marca, "</TD> <TD>").concat(objet[index].medidas, "</TD> <TD>").concat(objet[index].precio, "</td><td> ").concat(objet[index].foto, " </td><td> <img src=\"").concat(objet[index].foto, "\" width=\"50\" height=\"50\" /> </td>\n                        <td><input type=\"button\" value=\"Llenar datos\" name=\"btn-llenarDatos\" data-obj= ").concat(JSON.stringify(objet[index]), "\n                        ></td></TD> </TR>");
                    }
                    tabla += "</TABLE>";
                    document.getElementById("divTabla").innerHTML = tabla;
                    document.getElementsByName("btn-llenarDatos").forEach(function (element) {
                        element.addEventListener("click", function () {
                            var json = element.getAttribute("data-obj");
                            var obj = JSON.parse(json);
                            document.getElementById("idNeumatico").value = obj.id;
                            document.getElementById("marca").value = obj.marca;
                            document.getElementById("medidas").value = obj.medidas;
                            document.getElementById("precio").value = obj.precio;
                        });
                    });
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
        Manejadora.VerificarNeumaticoBD = function () {
            var funccion = new Manejadora();
            funccion.VerificarNeumaticoBD();
        };
        Manejadora.AgregarNeumaticoFoto = function () {
            var funccion = new Manejadora();
            funccion.AgregarNeumaticoFoto();
        };
        Manejadora.BorrarNeumaticoFoto = function () {
            var funccion = new Manejadora();
            funccion.BorrarNeumaticoFoto();
        };
        Manejadora.ModificarNeumaticoBDFoto = function () {
            var funccion = new Manejadora();
            funccion.ModificarNeumaticoBDFoto();
        };
        Manejadora.prototype.EliminarNeumatico = function () {
            xhttp.open("POST", "./backend/eliminarNeumaticoBD.php", true);
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = (Number)(document.getElementById("precio").value);
            var id = (Number)(document.getElementById("idNeumatico").value);
            if (window.confirm("Seguro quieres eliminar el neumatico marca: " + marca + " medida: " + medidas)) {
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
            xhttp.open("POST", "./backend/modificarNeumaticoBD.php", true);
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
        Manejadora.prototype.VerificarNeumaticoBD = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var neumatico = {
                marca: marca,
                medidas: medidas,
            };
            xhttp.open("POST", "./backend/verificarNeumaticoBD.php", true);
            formData.append('obj_neumatico', JSON.stringify(neumatico));
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    alert(xhttp.responseText);
                }
            };
        };
        Manejadora.prototype.AgregarNeumaticoFoto = function () {
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = (Number)(document.getElementById("precio").value);
            var foto = document.getElementById("foto");
            xhttp.open("POST", "./backend/agregarNeumaticoBD.php", true);
            formData.append('marca', marca);
            formData.append('medidas', medidas);
            formData.append('precio', precio.toString());
            formData.append('foto', foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                    Manejadora.MostrarNeumaticosBD();
                }
            };
        };
        Manejadora.prototype.BorrarNeumaticoFoto = function () {
            xhttp.open("POST", "./backend/eliminarNeumaticoBDFoto.php", true);
            var marca = document.getElementById("marca").value;
            var medidas = document.getElementById("medidas").value;
            var precio = (Number)(document.getElementById("precio").value);
            var id = (Number)(document.getElementById("idNeumatico").value);
            var foto = document.getElementById("foto");
            if (window.confirm("Seguro quieres eliminar el neumatico marca: " + marca + " medida: " + medidas)) {
                var neumatico = {
                    marca: marca,
                    medidas: medidas,
                    precio: precio,
                    id: id
                };
                formData.append('foto', foto.files[0]);
                xhttp.setRequestHeader("enctype", "multipart/form-data");
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
        Manejadora.prototype.ModificarNeumaticoBDFoto = function () {
        };
        return Manejadora;
    }());
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map