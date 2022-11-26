"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agregarCategoria = exports.listarCategorias = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var listarCategorias = function () {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/categorias")).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.listarCategorias = listarCategorias;
var agregarCategoria = function (nombre, token) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/categorias"), nombre, {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    }).then(function (response) {
        return {
            success: true
        };
    })
        .catch(function (error) {
        if (error.response.status.toString() !== "409") {
            return {
                success: false,
                message: "Error en el servidor"
            };
        }
        else {
            return {
                success: false,
                message: error.response.data.message
            };
        }
    });
};
exports.agregarCategoria = agregarCategoria;
