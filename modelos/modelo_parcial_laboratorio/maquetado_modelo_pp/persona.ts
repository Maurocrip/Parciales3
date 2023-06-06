namespace Entidades
{
    export class Persona
    {
        public  _nombre : string;
        public  _correo : string; 
        public  _clave : string;

        public constructor(correo:string, clave:string, nombre : string) 
        {
            this._clave = clave;
            this._correo = correo;
            this._nombre = nombre;
        }

        public ToString() : string
        {
            let cadena :string= '"nombre"=' + this._nombre + ', "correo"=' + this._correo + 
                                ', "clave"=' + this._clave;
            return cadena;
        }
    }
}