"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarCategoria = exports.listarCategorias = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var listarCategorias = function () {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/categorias")).then(function (response) {
        return response.data.Categorias;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.listarCategorias = listarCategorias;
var agregarCategoria = function (nombre, token) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/categorias"), nombre).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.agregarCategoria = agregarCategoria;
