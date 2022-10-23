"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarCategoria = exports.listarProductos = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var listarProductos = function () {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/categorias")).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.listarProductos = listarProductos;
var agregarCategoria = function (nombre, token) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/categorias"), nombre).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.agregarCategoria = agregarCategoria;
