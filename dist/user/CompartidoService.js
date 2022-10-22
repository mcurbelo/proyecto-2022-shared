"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarProductos = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var listarProductos = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var consulta;
    if (pageNo != "")
        consulta = "pageNo=" + pageNo;
    if (pageSize != "")
        consulta = consulta + "&pageSize=" + pageSize;
    if (sortBy != "")
        consulta = consulta + "&sortBy=" + sortBy;
    if (sortDir != "")
        consulta = consulta + "&sortDir=" + sortDir;
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/productos"), {
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer ".concat(token)
        },
        params: {
            filtros: filtros
        }
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error;
    });
};
exports.listarProductos = listarProductos;
