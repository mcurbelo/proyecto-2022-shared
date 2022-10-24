"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listarProductos = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var listarProductos = function (pageNo, pageSize, sortBy, sortDir, filtros) {
    var _a;
    var searchParams = new URLSearchParams();
    if (pageNo != "")
        searchParams.append("pageNo", pageNo);
    if (pageSize != "")
        searchParams.append("pageSize", pageSize);
    if (sortBy != "")
        searchParams.append("sortBy", sortBy);
    if (sortDir != "")
        searchParams.append("sortDir", sortDir);
    if (filtros.categorias != undefined && ((_a = filtros.categorias) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        filtros.categorias.forEach(function (categoria) { return searchParams.append("categorias", categoria); });
    }
    if (filtros.nombre != undefined)
        searchParams.append("nombre", filtros.nombre);
    if (filtros.idEventoPromocional != undefined)
        searchParams.append("idEventoPromocional", filtros.idEventoPromocional);
    if (filtros.recibirInfoEventoActivo)
        searchParams.append("infoEventoActivo", "true");
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/productos")).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.listarProductos = listarProductos;
