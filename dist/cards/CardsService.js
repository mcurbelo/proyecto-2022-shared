"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchTarjetas = exports.agregarTarjeta = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var axiosConfig = function (token) {
    return {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    };
};
var agregarTarjeta = function (request) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(request.uuid, "/tarjetas"), request, axiosConfig(request.token));
};
exports.agregarTarjeta = agregarTarjeta;
var fetchTarjetas = function (request) {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(request.uuid, "/tarjetas"), axiosConfig(request.token));
};
exports.fetchTarjetas = fetchTarjetas;
