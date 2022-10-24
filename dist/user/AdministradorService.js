"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoUsuario = exports.nuevoAdministrador = exports.revisarSolicitudNuevoVendedor = exports.cambiarEstadoUsuario = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var cambiarEstadoUsuario = function (idUsuario, token, motivo, nuevoEstado) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/administradores/usuarios/").concat(idUsuario, "?operacion=").concat(nuevoEstado), motivo).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.cambiarEstadoUsuario = cambiarEstadoUsuario;
var revisarSolicitudNuevoVendedor = function (idUsuario, token, aceptar, motivo) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/administradores/usuarios/").concat(idUsuario, "/solicitudes?aceptar=").concat(aceptar), motivo).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.revisarSolicitudNuevoVendedor = revisarSolicitudNuevoVendedor;
var nuevoAdministrador = function (token, datos) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/administradores"), datos).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.nuevoAdministrador = nuevoAdministrador;
var EstadoUsuario;
(function (EstadoUsuario) {
    EstadoUsuario["Activo"] = "Activo";
    EstadoUsuario["Bloqueado"] = "Bloqueado";
    EstadoUsuario["Eliminado"] = "Eliminado";
})(EstadoUsuario = exports.EstadoUsuario || (exports.EstadoUsuario = {}));
