"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.marcarReclamoResuelto = exports.nuevoReclamo = exports.reclamosHechos = exports.listarCompras = exports.nuevaCompra = exports.obtenerDirecciones = exports.editarDireccion = exports.agregarDireccion = exports.enviarSolicitudVendedor = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var enviarSolicitudVendedor = function (solicitud, imagenes, token) {
    console.log(solicitud, imagenes, token);
    var json = JSON.stringify(solicitud);
    var blob = new Blob([json], {
        type: 'application/json'
    });
    var data = new FormData();
    data.append("datos", blob);
    imagenes.forEach(function (imagen) {
        data.append("imagenes", imagen);
    });
    console.log(JSON.stringify(data));
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compradores/solicitudVendedor"), data, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer ".concat(token)
        },
    }).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.enviarSolicitudVendedor = enviarSolicitudVendedor;
var agregarDireccion = function (token, direccion) {
    console.log("AGREGANDO DIRECCIOOOOOON");
    var config = {
        headers: { Authorization: "Bearer ".concat(token) }
    };
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compradores/agregarDireccion"), {
        calle: direccion.calle,
        numero: direccion.numero,
        departamento: direccion.departamento,
        localidad: direccion.localidad,
        notas: direccion.notas,
        esLocal: direccion.esLocal
    }, config).then(function (response) {
        return response.status;
    }).catch(function (error) {
        return error.response.data.status;
    });
};
exports.agregarDireccion = agregarDireccion;
var editarDireccion = function (token, direccion) {
    var config = {
        headers: { Authorization: "Bearer ".concat(token) }
    };
    return axios_1.default.patch("http://".concat(__1.Auth.endpoint, "/api/compradores/Direcciones"), {
        id: direccion.id,
        calle: direccion.calle,
        numero: direccion.numero,
        departamento: direccion.departamento,
        localidad: direccion.localidad,
        notas: direccion.notas,
        esLocal: direccion.esLocal
    }, config).then(function (response) {
        return {
            status: response.status
        };
    }).catch(function (error) {
        return {
            status: error.response.data.status
        };
    });
};
exports.editarDireccion = editarDireccion;
var obtenerDirecciones = function (token) {
    var config = {
        headers: { Authorization: "Bearer ".concat(token) }
    };
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/compradores/Direcciones"), config).then(function (response) {
        return response.data;
    }).catch(function (error) {
        return error.response.data.status;
    });
};
exports.obtenerDirecciones = obtenerDirecciones;
var nuevaCompra = function (idUsuario, token, datos) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compradores/").concat(idUsuario, "/compras"), datos, {}).then(function (response) {
        return response.status.toString();
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.nuevaCompra = nuevaCompra;
var listarCompras = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var searchParams = new URLSearchParams();
    if (pageNo != "")
        searchParams.append("pageNo", pageNo);
    if (pageSize != "")
        searchParams.append("pageSize", pageSize);
    if (sortBy != "")
        searchParams.append("sortBy", sortBy);
    if (sortDir != "")
        searchParams.append("sortDir", sortDir);
    if (filtros.nombreProducto != undefined)
        searchParams.append("nombreProducto", filtros.nombreProducto);
    if (filtros.nombreVendedor != undefined)
        searchParams.append("nombreVendedor", filtros.nombreVendedor);
    if (filtros.fecha != undefined)
        searchParams.append("fecha", filtros.fecha);
    if (filtros.estado != undefined)
        searchParams.append("estado", filtros.estado.toString());
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/compradores/").concat(idUsuario, "/compras?").concat(searchParams.toString()), {}).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.listarCompras = listarCompras;
var reclamosHechos = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var searchParams = new URLSearchParams();
    if (pageNo != "")
        searchParams.append("pageNo", pageNo);
    if (pageSize != "")
        searchParams.append("pageSize", pageSize);
    if (sortBy != "")
        searchParams.append("sortBy", sortBy);
    if (sortDir != "")
        searchParams.append("sortDir", sortDir);
    if (filtros.resolucion != undefined)
        searchParams.append("estado", filtros.resolucion.toString());
    if (filtros.tipo != undefined)
        searchParams.append("estado", filtros.tipo.toString());
    if (filtros.fecha != undefined)
        searchParams.append("fecha", filtros.fecha);
    if (filtros.nombreProducto != undefined)
        searchParams.append("nombre", filtros.nombreProducto);
    if (filtros.nombreUsuario != undefined)
        searchParams.append("nombre", filtros.nombreUsuario);
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/compradores/").concat(idUsuario, "/compras/reclamos?").concat(searchParams.toString()), {}).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.reclamosHechos = reclamosHechos;
var nuevoReclamo = function (idUsuario, token, idCompra, datos) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compradores/").concat(idUsuario, "/compras/").concat(idCompra, "/reclamos"), datos, {}).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.nuevoReclamo = nuevoReclamo;
var marcarReclamoResuelto = function (idUsuario, token, idCompra, idReclamo) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/compradores/").concat(idUsuario, "/compras/").concat(idCompra, "/reclamos/").concat(idReclamo), {}).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.marcarReclamoResuelto = marcarReclamoResuelto;
