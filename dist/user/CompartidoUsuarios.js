"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calificar = exports.completarEnvio = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var completarEnvio = function (idCompra, token) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/compras/enviadas/").concat(idCompra)).then(function (response) {
        return response.status.toString();
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.completarEnvio = completarEnvio;
var calificar = function (idCompra, token, datos) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compras/calificaciones/").concat(idCompra), datos).then(function (response) {
        return response.status.toString();
    })
        .catch(function (error) {
        console.log(error);
        return error.response.data.message;
    });
};
exports.calificar = calificar;
