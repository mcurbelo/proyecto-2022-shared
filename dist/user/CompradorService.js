"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificarRespuesta = exports.iniciarChat = exports.obtenerChat = exports.marcarReclamoResuelto = exports.nuevoReclamo = exports.reclamosHechos = exports.listarCompras = exports.nuevaCompra = exports.obtenerDirecciones = exports.editarDireccion = exports.borrarDireccion = exports.agregarDireccion = exports.enviarSolicitudVendedor = void 0;
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
            "Content-Type": "multipart/form-data",
            Authorization: "Bearer ".concat(token)
        },
    });
};
exports.enviarSolicitudVendedor = enviarSolicitudVendedor;
var agregarDireccion = function (token, direccion) {
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
        return { success: true };
    }).catch(function (error) {
        return { success: false,
            message: error.response.data.message
        };
    });
};
exports.agregarDireccion = agregarDireccion;
var borrarDireccion = function (token, direccion) {
    var config = {
        headers: { Authorization: "Bearer ".concat(token) }
    };
    return axios_1.default.delete("http://".concat(__1.Auth.endpoint, "/api/compradores/Direccion/").concat(direccion), config).then(function (response) {
        return {
            status: response.status
        };
    }).catch(function (error) {
        return {
            status: error.response.data.status
        };
    });
};
exports.borrarDireccion = borrarDireccion;
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
        searchParams.append("resolucion", filtros.resolucion.toString());
    if (filtros.tipo != undefined)
        searchParams.append("tipo", filtros.tipo.toString());
    if (filtros.fecha != undefined)
        searchParams.append("fecha", filtros.fecha);
    if (filtros.nombreProducto != undefined)
        searchParams.append("nombreProducto", filtros.nombreProducto);
    if (filtros.nombreUsuario != undefined)
        searchParams.append("nombreUsuario", filtros.nombreUsuario);
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
        return response.status.toString();
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.nuevoReclamo = nuevoReclamo;
var marcarReclamoResuelto = function (idUsuario, token, idCompra, idReclamo) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/compradores/").concat(idUsuario, "/compras/").concat(idCompra, "/reclamos/").concat(idReclamo), {}).then(function (response) {
        return response.status.toString();
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.marcarReclamoResuelto = marcarReclamoResuelto;
var obtenerChat = function (idcompra, token) {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/compras/chat/").concat(idcompra)).then(function (response) {
        return response.data;
    }).catch(function (error) { });
};
exports.obtenerChat = obtenerChat;
var iniciarChat = function (idcompra, idchat, token) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/compras/iniciarChat"), { idCompra: idcompra, idChat: idchat }).then(function (response) {
        return response.data;
    }).catch(function (error) { });
};
exports.iniciarChat = iniciarChat;
var notificarRespuesta = function (idCompra, idUsuario, token) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/compras/chat/").concat(idCompra, "/mensajes?idUsuario=").concat(idUsuario));
};
exports.notificarRespuesta = notificarRespuesta;
