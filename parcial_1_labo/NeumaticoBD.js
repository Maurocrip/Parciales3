"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Entidades;
(function (Entidades) {
    var NeumaticoBD = (function (_super) {
        __extends(NeumaticoBD, _super);
        function NeumaticoBD(marca, medida, precio, id, pathFoto) {
            var _this = _super.call(this, marca, medida, precio) || this;
            _this._id = id;
            _this._pathFoto = pathFoto;
            return _this;
        }
        NeumaticoBD.prototype.ToJSON = function () {
            var cadena = '{"id"=' + this._id + ', "pathFoto"=' + this._pathFoto + ', ' + _super.prototype.ToString.call(this) + '}';
            return JSON.parse(cadena);
        };
        return NeumaticoBD;
    }(Entidades.Neumatico));
    Entidades.NeumaticoBD = NeumaticoBD;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=NeumaticoBD.js.map