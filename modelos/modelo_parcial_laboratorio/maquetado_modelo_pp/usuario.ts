/// <reference path="./persona.ts"/>

namespace Entidades
{
    export class Usuario extends Persona
    {
        public  _id : number;
        public  _id_perfil : number; 
        public  _perfil : string;

        constructor(correo:string, clave:string, nombre : string, id:number, idPerfil:number, perfil : string) 
        {
            super(correo,clave,nombre);
            this._id = id;
            this._id_perfil = idPerfil;
            this._perfil = perfil;
        }

        public ToJSON():JSON
        {
            let cadena : string = '{"id"=' + this._id+ ', "idPerfil"=' + this._id_perfil +
            ', "perfil"=' + this._perfil + ', ' +super.ToString() + '}';
            return JSON.parse(cadena);  
        }
    }
}