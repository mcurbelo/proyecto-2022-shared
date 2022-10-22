"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarSolicitudVendedor = void 0;
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
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "api/compradores/solicitudVendedor"), data, {
        headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": "Bearer ".concat(token)
        },
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error;
    });
};
exports.enviarSolicitudVendedor = enviarSolicitudVendedor;
