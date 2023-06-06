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
    var Usuario = (function (_super) {
        __extends(Usuario, _super);
        function Usuario(correo, clave, nombre, id, idPerfil, perfil) {
            var _this = _super.call(this, correo, clave, nombre) || this;
            _this._id = id;
            _this._id_perfil = idPerfil;
            _this._perfil = perfil;
            return _this;
        }
        Usuario.prototype.ToJSON = function () {
            var cadena = '{"id"=' + this._id + ', "idPerfil"=' + this._id_perfil +
                ', "perfil"=' + this._perfil + ', ' + _super.prototype.ToString.call(this) + '}';
            return JSON.parse(cadena);
        };
        return Usuario;
    }(Entidades.Persona));
    Entidades.Usuario = Usuario;
})(Entidades || (Entidades = {}));
//# sourceMappingURL=usuario.js.map