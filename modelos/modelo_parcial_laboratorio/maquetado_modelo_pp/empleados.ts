/// <reference path="./usuario.ts"/>

namespace Entidades
{
    class Empleados extends Usuario
    {
        public  _sueldo : number; 
        public  _foto : string;
    
        constructor(correo:string, clave:string, nombre : string, id:number, idPerfil:number, perfil : string, sueldo:number, foto : string) 
        {
            super(correo,clave,nombre,id,idPerfil,perfil);
            this._sueldo = sueldo;
            this._foto = foto;
        } 
    }
}