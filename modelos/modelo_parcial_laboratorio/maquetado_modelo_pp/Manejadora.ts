namespace ModeloParcial
{
    const xhttp : XMLHttpRequest = new XMLHttpRequest();
    const formData : FormData = new FormData();
    export class Manejadora
    {

        //-------------------------------------------------------------------JSON-----------------------------------------------------------------
        public static AgregarUsuarioJSON()
        {
            let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let correo: string = (<HTMLInputElement> document.getElementById("correo")).value;
            let clave: string = (<HTMLInputElement> document.getElementById("clave")).value;
        
            xhttp.open("POST", "./backend/AltaUsuarioJSON.php", true);

            formData.append('nombre', nombre);
            formData.append('correo', correo);
            formData.append('clave', clave);
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        public static MostrarUsuariosJSON()
        {
            xhttp.open("POST", "./backend/ListadoUsuariosJSON.php", true);
                
            xhttp.send();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let objet : any = JSON.parse(xhttp.responseText);
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                    let tabla : string =" <TABLE BORDER><TR><TH>Nombre</TH> <TH>Clave</TH> <TH>Correo</TH></TR>";
                    for (let index = 0; index < objet.length; index++) {
                        tabla += `<TR><TD>${objet[index]._nombre}</TD> <TD>${objet[index]._clave}</TD> <TD>${objet[index]._correo}</TD> </TR>`;                    
                    }
                    tabla += `</TABLE>`;
                    (<HTMLInputElement> document.getElementById("divTabla")).innerHTML = tabla;
                }
            }
        }

        public static VerificarUsuarioJSON()
        {
            xhttp.open("POST", "./backend/VerificarUsuarioJSON.php", true);
                
            let correo: string = (<HTMLInputElement> document.getElementById("correo")).value;
            let clave: string = (<HTMLInputElement> document.getElementById("clave")).value;

            let usuario = {
                clave: clave,
                correo: correo
            };
            formData.append('usuario_json', JSON.stringify(usuario));
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        //---------------------------------------------------------------USUARIO BD-----------------------------------------------------------------
        public static AgregarUsuario()
        {
            let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let correo: string = (<HTMLInputElement> document.getElementById("correo")).value;
            let clave: string = (<HTMLInputElement> document.getElementById("clave")).value;
            let id_perfil: string = (<HTMLInputElement> document.getElementById("cboPerfiles")).value;
        
            xhttp.open("POST", "./backend/AltaUsuario.php", true);

            formData.append('nombre', nombre);
            formData.append('correo', correo);
            formData.append('clave', clave);
            formData.append('id_perfil', id_perfil);
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        public static MostrarUsuarios()
        {
            xhttp.open("GET", "./backend/ListadoUsuarios.php", true);
                
            xhttp.send();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    (<HTMLInputElement> document.getElementById("divTabla")).innerHTML = xhttp.responseText;
                    
                    document.getElementsByName("btn-llenarDatos").forEach(element => 
                    {
                        element.addEventListener("click", () =>
                        {
                            let json : any = element.getAttribute("data-obj");
                            let obj : any = JSON.parse(json);
                
                            this.agregarDatos(obj,false);
                        }
                        );
                    })

                    document.getElementsByName("btn-eliminar").forEach(element => 
                    {
                        element.addEventListener("click", () =>
                        {
                            let json : any = element.getAttribute("data-obj");
                            let obj : any = JSON.parse(json);
                
                            this.agregarDatos(obj,false);
                            
                            this.EliminarUsuario();
                        }
                        );
                    })
                }
            }
        }

        public static ModificarUsuario()
        {
            let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let correo: string = (<HTMLInputElement> document.getElementById("correo")).value;
            let clave: string = (<HTMLInputElement> document.getElementById("clave")).value;
            let id_perfil: string = (<HTMLInputElement> document.getElementById("cboPerfiles")).value;
            let id: string = (<HTMLInputElement> document.getElementById("id")).value;
        
            xhttp.open("POST", "./backend/ModificarUsuario.php", true);

            let usuario = {
                clave: clave,
                correo: correo,
                nombre: nombre,
                id_perfil: id_perfil,
                id: id
            };
            formData.append('usuario_json', JSON.stringify(usuario));
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        public static VerificarUsuario()
        {
            xhttp.open("POST", "./backend/VerificarUsuario.php", true);
                
            let correo: string = (<HTMLInputElement> document.getElementById("correo")).value;
            let clave: string = (<HTMLInputElement> document.getElementById("clave")).value;

            let usuario = {
                clave: clave,
                correo: correo
            };
            formData.append('usuario_json', JSON.stringify(usuario));
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }
        public static EliminarUsuario()
        {
            xhttp.open("POST", "./backend/EliminarUsuario.php", true);
                
            let id: string = (<HTMLInputElement> document.getElementById("id")).value;

            formData.append('id', id);
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        //---------------------------------------------------------------EMPLEADO BD-----------------------------------------------------------------
        public static AgregarEmpleado()
        {
            let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let correo: string = (<HTMLInputElement> document.getElementById("correo")).value;
            let clave: string = (<HTMLInputElement> document.getElementById("clave")).value;
            let id_perfil: string = (<HTMLInputElement> document.getElementById("cboPerfiles")).value;
            let sueldo: string = (<HTMLInputElement> document.getElementById("sueldo")).value;
            let foto: any = (<HTMLInputElement> document.getElementById("foto"));
        
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
        }

        public static MostrarEmpleado()
        {
            xhttp.open("GET", "./backend/ListadoEmpleados.php", true);
                
            xhttp.send();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    (<HTMLInputElement> document.getElementById("divTablaEmpleados")).innerHTML = xhttp.responseText;
                    
                    document.getElementsByName("btn-llenarDatos").forEach(element => 
                    {
                        element.addEventListener("click", () =>
                        {
                            let json : any = element.getAttribute("data-obj");
                            let obj : any = JSON.parse(json);
                
                            this.agregarDatos(obj,true);
                        }
                        );
                    })

                    document.getElementsByName("btn-eliminar").forEach(element => 
                    {
                        element.addEventListener("click", () =>
                        {
                            let json : any = element.getAttribute("data-obj");
                            let obj : any = JSON.parse(json);
                
                            this.agregarDatos(obj,true);
                            if(confirm("seguro quieres eliminar el usuario con sueldo: " + obj.sueldo + " y nombre: " + obj.nombre))
                            {
                                this.EliminarEmpleado();
                            }
                        }
                        );
                    })
                }
            }
        }

        public static ModificarEmpleado()
        {
            let nombre : string = (<HTMLInputElement> document.getElementById("nombre")).value;
            let correo: string = (<HTMLInputElement> document.getElementById("correo")).value;
            let clave: string = (<HTMLInputElement> document.getElementById("clave")).value;
            let id_perfil: string = (<HTMLInputElement> document.getElementById("cboPerfiles")).value;
            let id: string = (<HTMLInputElement> document.getElementById("id")).value;
            let sueldo: string = (<HTMLInputElement> document.getElementById("sueldo")).value;
            let foto: any = (<HTMLInputElement> document.getElementById("foto"));
            let usuario = {
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
        }

        public static EliminarEmpleado()
        {
            let id: string = (<HTMLInputElement> document.getElementById("id")).value;

            xhttp.open("POST", "./backend/EliminarEmpleado.php", true);                

            formData.append('id', id);
                
            xhttp.send(formData);

            this.respuestaDefouldEmpleado();
        }

        public static agregarDatos(obj : any, empleado : boolean)
        {
            (<HTMLInputElement>document.getElementById("id")).value = obj.id;
            (<HTMLInputElement>document.getElementById("nombre")).value = obj.nombre;
            (<HTMLInputElement>document.getElementById("correo")).value = obj.correo;
            (<HTMLInputElement>document.getElementById("clave")).value = obj.clave; 
            (<HTMLInputElement>document.getElementById("cboPerfiles")).value = obj.id_perfil; 
            if(empleado)
            {
                (<HTMLInputElement>document.getElementById("sueldo")).value = obj.sueldo; 
                (<HTMLInputElement>document.getElementById("imgFoto")).src = obj.foto; 
            }
            
        }

        public static respuestaDefouldEmpleado()
        {
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                    this.MostrarEmpleado();
                }
            }
        }
    }
}