namespace ModeloParcial
{
    const xhttp : XMLHttpRequest = new XMLHttpRequest();
    const formData : FormData = new FormData();
    export class Manejadora implements Iparte2
    {
        public static AgregarNeumaticoJSON()
        {
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
        
            xhttp.open("POST", "/parcial_uno/backend/altaNeumaticoJSON.php", true);

            formData.append('marca', marca);
            formData.append('medidas', medidas);
            formData.append('precio', precio.toString());
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        public static MostrarNeumaticosJSON()
        {
            xhttp.open("GET", "/parcial_uno/backend/listadoNeumaticosJSON.php", true);
                
            xhttp.send();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    let objet : any = JSON.parse(xhttp.responseText);
                    let tabla : string =" <TABLE BORDER><TR><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH></TR>";
                    for (let index = 0; index < objet.length; index++) {
                        tabla += `<TR><TD>${objet[index]._marca}</TD> <TD>${objet[index]._medidias}</TD> <TD>${objet[index]._precio}</TD> </TR>`;                    
                    }
                    tabla += `</TABLE>`;
                    (<HTMLInputElement> document.getElementById("divTabla")).innerHTML = tabla;
                }
            }
        }

        public static VerificarNeumaticoJSON()
        {
            xhttp.open("POST", "/parcial_uno/backend/verificarNeumaticoJSON.php", true);
                
            let marca: string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;

            formData.append('marca', marca);
            formData.append('medidas', medidas);
                
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        public static AgregarNeumaticoSinFoto()
        {
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
        
            xhttp.open("POST", "/parcial_uno/backend/agregarNeumaticoSinFoto.php", true);

            let neumatico = {
                marca: marca,
                medidas: medidas,
                precio:precio
            };
            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    alert(xhttp.responseText);
                    console.log(xhttp.responseText);
                }
            }
        }

        public static MostrarNeumaticosBD()
        {
            xhttp.open("GET", "/parcial_uno/backend/listadoNeumaticoBD.php", true);
                
            xhttp.send();

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log(xhttp.responseText);
                    let objet : any = JSON.parse(xhttp.responseText);
                    let tabla : string =" <TABLE BORDER><TR><TH>id</TH><TH>Marca</TH> <TH>Medidas</TH> <TH>Precio</TH> <TH>PATH FOTO</TH>  <TH>FOTO</TH></TR>";
                    objet.forEach(element => {
                        tabla +=`<tr><td> ${element.id }</td><td> ${element.marca} </td><td> ${element.medidas} </td><td> ${element.precio} </td><td> ${element.foto} </td><td> <img src=\"${element.foto}\" width=\"50\" height=\"50\" /> </td></tr>`;
                    })
                    tabla += `</TABLE>`;
                    (<HTMLInputElement> document.getElementById("divTabla")).innerHTML = tabla;
                    (<HTMLInputElement> document.getElementById("idNeumatico")).readOnly = false;
                }
            }
        }
        
        public static ModificarNeumatico()
        {
            let funccion = new Manejadora();

            funccion.ModificarNeumatico();
        }
        public static EliminarNeumatico()
        {
            let funccion = new Manejadora();

            funccion.EliminarNeumatico();
        }

        EliminarNeumatico()
        {
            xhttp.open("POST", "/parcial_uno/backend/eliminarNeumaticoBD.php", true);
                
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
            let id: number = (Number)((<HTMLInputElement> document.getElementById("idNeumatico")).value);

            if(window.confirm("Seguro quieres eliminar el neumatico marcca: " + marca + " medida: " + medidas))
            {
                let neumatico = {
                    marca: marca,
                    medidas: medidas,
                    precio:precio,
                    id:id
                };
    
                formData.append('neumatico_json', JSON.stringify(neumatico));
                xhttp.send(formData);
    
                xhttp.onreadystatechange = () => {
                    if (xhttp.readyState == 4 && xhttp.status == 200) {
                        console.log(xhttp.responseText);
                        alert(xhttp.responseText);
                        Manejadora.MostrarNeumaticosBD();
                    }
                }
            }
        }

        ModificarNeumatico()
        {
            xhttp.open("POST", "/parcial_uno/backend/modificarNeumaticoBD.php", true);
                
            let marca : string = (<HTMLInputElement> document.getElementById("marca")).value;
            let medidas: string = (<HTMLInputElement> document.getElementById("medidas")).value;
            let precio: number = (Number)((<HTMLInputElement> document.getElementById("precio")).value);
            let id: number = (Number)((<HTMLInputElement> document.getElementById("idNeumatico")).value);
         
            let neumatico = {
                marca: marca,
                medidas: medidas,
                precio:precio,
                id:id
            };

            formData.append('neumatico_json', JSON.stringify(neumatico));
            xhttp.send(formData);

            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    let objet : any = JSON.parse(xhttp.responseText);
                    if(objet.exito)
                    {   
                        Manejadora.MostrarNeumaticosBD();
                    }
                    else
                    {
                        console.log(objet.mensaje);
                        alert(objet.mensaje);
                    }
                }
            }
        }
    }
}