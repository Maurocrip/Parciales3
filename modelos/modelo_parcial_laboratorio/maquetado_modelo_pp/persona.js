"use strict";
var Entidades;
(function (Entidades) {
    var Persona = (function () {
        function Persona(correo, clave, nombre) {
            this._clave = clave;
            this._correo = correo;
            this._nombre = nombre;
        }
        Persona.prototype.ToString = function () {
            var cadena = '"nombre"=' + this._nombre + ', "correo"=' + this._correo +
                ', "clave"=' + this._clave;
            return cadena;
        };
        return Persona;
    }());
    Entidades.Persona = Persona;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=persona.js.map