"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nuevaCompra = exports.enviarSolicitudVendedor = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var enviarSolicitudVendedor = function (solicitud, imagenes, token) {
    var json = JSON.stringify(solicitud);
    var blob = new Blob([json], {
        type: 'application/json'
    });
    var data = new FormData();
    data.append("datos", blob);
    imagenes.forEach(function (imagen) {
        data.append("imagenes", imagen);
    });
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compradores/solicitudVendedor"), data, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    }).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.enviarSolicitudVendedor = enviarSolicitudVendedor;
var nuevaCompra = function (datos) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compras"), datos, {}).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.nuevaCompra = nuevaCompra;
