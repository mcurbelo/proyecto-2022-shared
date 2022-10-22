"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoCompra = exports.EstadoProducto = exports.TipoReclamo = exports.TipoResolucion = exports.listarReclamosRecibidos = exports.gestionarReclamo = exports.listarMisVentas = exports.listarMisProductos = exports.cambiarEstadoProducto = exports.altaProducto = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var altaProducto = function (datosProducto, imagenes, token) {
    var json = JSON.stringify(datosProducto);
    var blob = new Blob([json], {
        type: 'application/json'
    });
    var data = new FormData();
    data.append("datos", blob);
    imagenes.forEach(function (imagen) {
        data.append("imagenes", imagen);
    });
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/productos"), data, {
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
exports.altaProducto = altaProducto;
var cambiarEstadoProducto = function (idUsuario, idProducto, nuevoEstado, token) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/").concat(idUsuario, "/productos/").concat(idProducto, "/estado?nuevoEstado=").concat(nuevoEstado), {
        headers: {
            "Authorization": "Bearer ".concat(token)
        },
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error;
    });
};
exports.cambiarEstadoProducto = cambiarEstadoProducto;
var listarMisProductos = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var consulta;
    if (pageNo != "")
        consulta = "pageNo=" + pageNo;
    if (pageSize != "")
        consulta = consulta + "&pageSize=" + pageSize;
    if (sortBy != "")
        consulta = consulta + "&sortBy=" + sortBy;
    if (sortDir != "")
        consulta = consulta + "&sortDir=" + sortDir;
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/").concat(idUsuario, "/productos?").concat(consulta), {
        headers: {
            "Authorization": "Bearer ".concat(token),
            'Content-Type': 'application/json'
        }, params: {
            filtros: filtros
        }
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error;
    });
};
exports.listarMisProductos = listarMisProductos;
var listarMisVentas = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var consulta;
    if (pageNo != "")
        consulta = "pageNo=" + pageNo;
    if (pageSize != "")
        consulta = consulta + "&pageSize=" + pageSize;
    if (sortBy != "")
        consulta = consulta + "&sortBy=" + sortBy;
    if (sortDir != "")
        consulta = consulta + "&sortDir=" + sortDir;
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/").concat(idUsuario, "/ventas?").concat(consulta), {
        headers: {
            "Authorization": "Bearer ".concat(token),
            'Content-Type': 'application/json'
        }, params: {
            filtros: filtros
        }
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error;
    });
};
exports.listarMisVentas = listarMisVentas;
var gestionarReclamo = function (idUsuario, token, idVenta, idReclamo, accion) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/").concat(idUsuario, "/ventas/").concat(idVenta, "/reclamos/").concat(idReclamo, "?accion=").concat(accion), {
        headers: {
            "Authorization": "Bearer ".concat(token),
            'Content-Type': 'application/json'
        },
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error;
    });
};
exports.gestionarReclamo = gestionarReclamo;
var listarReclamosRecibidos = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var consulta;
    if (pageNo != "")
        consulta = "pageNo=" + pageNo;
    if (pageSize != "")
        consulta = consulta + "&pageSize=" + pageSize;
    if (sortBy != "")
        consulta = consulta + "&sortBy=" + sortBy;
    if (sortDir != "")
        consulta = consulta + "&sortDir=" + sortDir;
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/").concat(idUsuario, "/ventas/reclamos?").concat(consulta), {
        headers: {
            "Authorization": "Bearer ".concat(token),
            'Content-Type': 'application/json'
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
exports.listarReclamosRecibidos = listarReclamosRecibidos;
var TipoResolucion;
(function (TipoResolucion) {
    TipoResolucion[TipoResolucion["Devolucion"] = 0] = "Devolucion";
    TipoResolucion[TipoResolucion["PorChat"] = 1] = "PorChat";
    TipoResolucion[TipoResolucion["NoResuelto"] = 2] = "NoResuelto";
})(TipoResolucion = exports.TipoResolucion || (exports.TipoResolucion = {}));
var TipoReclamo;
(function (TipoReclamo) {
    TipoReclamo[TipoReclamo["DesperfectoProducto"] = 0] = "DesperfectoProducto";
    TipoReclamo[TipoReclamo["RepticionIncoveniente"] = 1] = "RepticionIncoveniente";
    TipoReclamo[TipoReclamo["ProductoNoRecibido"] = 2] = "ProductoNoRecibido";
    TipoReclamo[TipoReclamo["ProducoErroneo"] = 3] = "ProducoErroneo";
    TipoReclamo[TipoReclamo["Otro"] = 4] = "Otro";
})(TipoReclamo = exports.TipoReclamo || (exports.TipoReclamo = {}));
var EstadoProducto;
(function (EstadoProducto) {
    EstadoProducto[EstadoProducto["Activo"] = 0] = "Activo";
    EstadoProducto[EstadoProducto["Pausado"] = 1] = "Pausado";
    EstadoProducto[EstadoProducto["BloqueadoADM"] = 2] = "BloqueadoADM";
})(EstadoProducto = exports.EstadoProducto || (exports.EstadoProducto = {}));
var EstadoCompra;
(function (EstadoCompra) {
    EstadoCompra[EstadoCompra["Cancelada"] = 0] = "Cancelada";
    EstadoCompra[EstadoCompra["Completada"] = 1] = "Completada";
    EstadoCompra[EstadoCompra["Confirmada"] = 2] = "Confirmada";
    EstadoCompra[EstadoCompra["EsperandoConfirmacion"] = 3] = "EsperandoConfirmacion";
})(EstadoCompra = exports.EstadoCompra || (exports.EstadoCompra = {}));
