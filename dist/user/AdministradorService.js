"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoUsuario = exports.listadoUsuarios = exports.nuevoAdministrador = exports.revisarSolicitudNuevoVendedor = exports.cambiarEstadoUsuario = void 0;
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
var listadoUsuarios = function (token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var searchParams = new URLSearchParams();
    if (pageNo != "")
        searchParams.append("pageNo", pageNo);
    if (pageSize != "")
        searchParams.append("pageSize", pageSize);
    if (sortBy != "")
        searchParams.append("sortBy", sortBy);
    if (sortDir != "")
        searchParams.append("sortDir", sortDir);
    if (filtros.nombre != undefined)
        searchParams.append("nombre", filtros.nombre);
    if (filtros.apellido != undefined)
        searchParams.append("apellido", filtros.apellido);
    if (filtros.correo != undefined)
        searchParams.append("correo", filtros.correo);
    if (filtros.estado != undefined)
        searchParams.append("estado", filtros.estado.toString());
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/usuarios")).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
        ;
    });
};
exports.listadoUsuarios = listadoUsuarios;
var EstadoUsuario;
(function (EstadoUsuario) {
    EstadoUsuario["Activo"] = "Activo";
    EstadoUsuario["Bloqueado"] = "Bloqueado";
    EstadoUsuario["Eliminado"] = "Eliminado";
})(EstadoUsuario = exports.EstadoUsuario || (exports.EstadoUsuario = {}));
