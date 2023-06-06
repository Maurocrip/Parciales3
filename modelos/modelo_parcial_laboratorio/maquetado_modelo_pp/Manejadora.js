"use strict";
var ModeloParcial;
(function (ModeloParcial) {
    var xhttp = new XMLHttpRequest();
    var formData = new FormData();
    var Manejadora = (function () {
        function Manejadora() {
        }
        Manejadora.AgregarUsuarioJSON = function () {
            var nombre = document.getElementById("nombre").value;
            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;
            xhttp.open("POST", "./backend/AltaUsuarioJSON.php", true);
            formData.append('nombre', nombre);
            formData.append('correo', correo);
            formData.append('clave', clave);
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarUsuariosJSON = function () {
            xhttp.open("POST", "./backend/ListadoUsuariosJSON.php", true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    var objet = JSON.parse(xhttp.responseText);
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                    var tabla = " <TABLE BORDER><TR><TH>Nombre</TH> <TH>Clave</TH> <TH>Correo</TH></TR>";
                    for (var index = 0; index < objet.length; index++) {
                        tabla += "<TR><TD>".concat(objet[index]._nombre, "</TD> <TD>").concat(objet[index]._clave, "</TD> <TD>").concat(objet[index]._correo, "</TD> </TR>");
                    }
                    tabla += "</TABLE>";
                    document.getElementById("divTabla").innerHTML = tabla;
                }
            };
        };
        Manejadora.VerificarUsuarioJSON = function () {
            xhttp.open("POST", "./backend/VerificarUsuarioJSON.php", true);
            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;
            var usuario = {
                clave: clave,
                correo: correo
            };
            formData.append('usuario_json', JSON.stringify(usuario));
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.AgregarUsuario = function () {
            var nombre = document.getElementById("nombre").value;
            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;
            var id_perfil = document.getElementById("cboPerfiles").value;
            xhttp.open("POST", "./backend/AltaUsuario.php", true);
            formData.append('nombre', nombre);
            formData.append('correo', correo);
            formData.append('clave', clave);
            formData.append('id_perfil', id_perfil);
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.MostrarUsuarios = function () {
            var _this = this;
            xhttp.open("GET", "./backend/ListadoUsuarios.php", true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    document.getElementById("divTabla").innerHTML = xhttp.responseText;
                    document.getElementsByName("btn-llenarDatos").forEach(function (element) {
                        element.addEventListener("click", function () {
                            var json = element.getAttribute("data-obj");
                            var obj = JSON.parse(json);
                            _this.agregarDatos(obj, false);
                        });
                    });
                    document.getElementsByName("btn-eliminar").forEach(function (element) {
                        element.addEventListener("click", function () {
                            var json = element.getAttribute("data-obj");
                            var obj = JSON.parse(json);
                            _this.agregarDatos(obj, false);
                            _this.EliminarUsuario();
                        });
                    });
                }
            };
        };
        Manejadora.ModificarUsuario = function () {
            var nombre = document.getElementById("nombre").value;
            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;
            var id_perfil = document.getElementById("cboPerfiles").value;
            var id = document.getElementById("id").value;
            xhttp.open("POST", "./backend/ModificarUsuario.php", true);
            var usuario = {
                clave: clave,
                correo: correo,
                nombre: nombre,
                id_perfil: id_perfil,
                id: id
            };
            formData.append('usuario_json', JSON.stringify(usuario));
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.VerificarUsuario = function () {
            xhttp.open("POST", "./backend/VerificarUsuario.php", true);
            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;
            var usuario = {
                clave: clave,
                correo: correo
            };
            formData.append('usuario_json', JSON.stringify(usuario));
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.EliminarUsuario = function () {
            xhttp.open("POST", "./backend/EliminarUsuario.php", true);
            var id = document.getElementById("id").value;
            formData.append('id', id);
            xhttp.send(formData);
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            };
        };
        Manejadora.AgregarEmpleado = function () {
            var nombre = document.getElementById("nombre").value;
            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;
            var id_perfil = document.getElementById("cboPerfiles").value;
            var sueldo = document.getElementById("sueldo").value;
            var foto = document.getElementById("foto");
            xhttp.open("POST", "./backend/AltaEmpleado.php", true);
            formData.append('nombre', nombre);
            formData.append('correo', correo);
            formData.append('clave', clave);
            formData.append('id_perfil', id_perfil);
            formData.append('sueldo', sueldo);
            formData.append('foto', foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(formData);
            this.respuestaDefouldEmpleado();
        };
        Manejadora.MostrarEmpleado = function () {
            var _this = this;
            xhttp.open("GET", "./backend/ListadoEmpleados.php", true);
            xhttp.send();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    document.getElementById("divTablaEmpleados").innerHTML = xhttp.responseText;
                    document.getElementsByName("btn-llenarDatos").forEach(function (element) {
                        element.addEventListener("click", function () {
                            var json = element.getAttribute("data-obj");
                            var obj = JSON.parse(json);
                            _this.agregarDatos(obj, true);
                        });
                    });
                    document.getElementsByName("btn-eliminar").forEach(function (element) {
                        element.addEventListener("click", function () {
                            var json = element.getAttribute("data-obj");
                            var obj = JSON.parse(json);
                            _this.agregarDatos(obj, true);
                            if (confirm("seguro quieres eliminar el usuario con sueldo: " + obj.sueldo + " y nombre: " + obj.nombre)) {
                                _this.EliminarEmpleado();
                            }
                        });
                    });
                }
            };
        };
        Manejadora.ModificarEmpleado = function () {
            var nombre = document.getElementById("nombre").value;
            var correo = document.getElementById("correo").value;
            var clave = document.getElementById("clave").value;
            var id_perfil = document.getElementById("cboPerfiles").value;
            var id = document.getElementById("id").value;
            var sueldo = document.getElementById("sueldo").value;
            var foto = document.getElementById("foto");
            var usuario = {
                clave: clave,
                correo: correo,
                nombre: nombre,
                id_perfil: id_perfil,
                id: id,
                sueldo: sueldo
            };
            xhttp.open("POST", "./backend/ModificarEmpleado.php", true);
            formData.append('empleado_json', JSON.stringify(usuario));
            formData.append('foto', foto.files[0]);
            xhttp.setRequestHeader("enctype", "multipart/form-data");
            xhttp.send(formData);
            this.respuestaDefouldEmpleado();
        };
        Manejadora.EliminarEmpleado = function () {
            var id = document.getElementById("id").value;
            xhttp.open("POST", "./backend/EliminarEmpleado.php", true);
            formData.append('id', id);
            xhttp.send(formData);
            this.respuestaDefouldEmpleado();
        };
        Manejadora.agregarDatos = function (obj, empleado) {
            document.getElementById("id").value = obj.id;
            document.getElementById("nombre").value = obj.nombre;
            document.getElementById("correo").value = obj.correo;
            document.getElementById("clave").value = obj.clave;
            document.getElementById("cboPerfiles").value = obj.id_perfil;
            if (empleado) {
                document.getElementById("sueldo").value = obj.sueldo;
                document.getElementById("imgFoto").src = obj.foto;
            }
        };
        Manejadora.respuestaDefouldEmpleado = function () {
            var _this = this;
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                    _this.MostrarEmpleado();
                }
            };
        };
        return Manejadora;
    }());
    ModeloParcial.Manejadora = Manejadora;
})(ModeloParcial || (ModeloParcial = {}));
//# sourceMappingURL=Manejadora.js.map