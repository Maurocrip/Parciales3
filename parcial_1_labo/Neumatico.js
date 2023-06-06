"use strict";
var Entidades;
(function (Entidades) {
    var Neumatico = (function () {
        function Neumatico(marca, medida, precio) {
            this._marca = marca;
            this._medida = medida;
            this._precio = precio;
        }
        Neumatico.prototype.ToString = function () {
            var cadena = '"marca"=' + this._marca + ', "medida"=' + this._medida +
                ', "precio"=' + this._precio;
            return cadena;
        };
        Neumatico.prototype.ToJSON = function () {
            var cadena = '{' + this.ToString() + '}';
            return JSON.parse(cadena);
        };
        return Neumatico;
    }());
    Entidades.Neumatico = Neumatico;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=Neumatico.js.map