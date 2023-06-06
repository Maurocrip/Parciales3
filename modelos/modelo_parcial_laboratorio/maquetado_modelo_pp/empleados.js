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
    var Empleados = (function (_super) {
        __extends(Empleados, _super);
        function Empleados(correo, clave, nombre, id, idPerfil, perfil, sueldo, foto) {
            var _this = _super.call(this, correo, clave, nombre, id, idPerfil, perfil) || this;
            _this._sueldo = sueldo;
            _this._foto = foto;
            return _this;
        }
        return Empleados;
    }(Entidades.Usuario));
})(Entidades || (Entidades = {}));
//# sourceMappingURL=empleados.js.map