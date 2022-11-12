"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstadoCompra = exports.EstadoProducto = exports.TipoReclamo = exports.TipoResolucion = exports.modificarProducto = exports.listarReclamosRecibidos = exports.completarVentaRetiro = exports.cambiarEstadoVenta = exports.gestionarReclamo = exports.listarMisVentas = exports.listarMisProductos = exports.cambiarEstadoProducto = exports.altaProducto = void 0;
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
            Authorization: "Bearer ".concat(token)
        }
    });
};
exports.altaProducto = altaProducto;
var cambiarEstadoProducto = function (idUsuario, token, idProducto, nuevoEstado) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/productos/").concat(idProducto, "/estado?nuevoEstado=").concat(nuevoEstado)).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.cambiarEstadoProducto = cambiarEstadoProducto;
var listarMisProductos = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
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
    if (filtros.estadoProducto != undefined)
        searchParams.append("estado", filtros.estadoProducto.toString());
    if (filtros.fecha != undefined)
        searchParams.append("fecha", filtros.fecha);
    if (filtros.nombre != undefined)
        searchParams.append("nombre", filtros.nombre);
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/productos?").concat(searchParams.toString())).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.listarMisProductos = listarMisProductos;
var listarMisVentas = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
    var searchParams = new URLSearchParams();
    if (pageNo != "")
        searchParams.append("pageNo", pageNo);
    if (pageSize != "")
        searchParams.append("pageSize", pageSize);
    if (sortBy != "")
        searchParams.append("sortBy", sortBy);
    if (sortDir != "")
        searchParams.append("sortDir", sortDir);
    if (filtros.fecha != undefined)
        searchParams.append("fecha", filtros.fecha);
    if (filtros.nombre != undefined)
        searchParams.append("nombre", filtros.nombre);
    if (filtros.estado != undefined)
        searchParams.append("estado", filtros.estado.toString());
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/ventas?").concat(searchParams.toString())).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
        ;
    });
};
exports.listarMisVentas = listarMisVentas;
var gestionarReclamo = function (idUsuario, token, idVenta, idReclamo, accion) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/ventas/").concat(idVenta, "/reclamos/").concat(idReclamo, "?accion=").concat(accion)).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.gestionarReclamo = gestionarReclamo;
var cambiarEstadoVenta = function (idUsuario, token, idVenta, accion, info) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/ventas/").concat(idVenta, "/estado?nuevoEstado=").concat(accion), info).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.cambiarEstadoVenta = cambiarEstadoVenta;
var completarVentaRetiro = function (idUsuario, token, idVenta) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/ventas/").concat(idVenta, "/estado?nuevoEstado=Completada"), {}).then(function (response) {
        return response.status;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.completarVentaRetiro = completarVentaRetiro;
var listarReclamosRecibidos = function (idUsuario, token, pageNo, pageSize, sortBy, sortDir, filtros) {
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
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/ventas/reclamos?").concat(searchParams.toString())).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
        ;
    });
};
exports.listarReclamosRecibidos = listarReclamosRecibidos;
var modificarProducto = function (idUsuario, token, idProducto, datos, imagenes) {
    var json = JSON.stringify(datos);
    var blob = new Blob([json], {
        type: 'application/json'
    });
    var data = new FormData();
    data.append("datos", blob);
    imagenes.forEach(function (imagen) {
        data.append("imagenes", imagen);
    });
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/vendedores/").concat(idUsuario, "/productos/").concat(idProducto), data)
        .then(function (response) {
        return {
            success: true
        };
    })
        .catch(function (error) {
        console.log(error);
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
exports.modificarProducto = modificarProducto;
var TipoResolucion;
(function (TipoResolucion) {
    TipoResolucion["Devolucion"] = "Devolucion";
    TipoResolucion["PorChat"] = "PorChat";
    TipoResolucion["NoResuelto"] = "NoResuelto";
})(TipoResolucion = exports.TipoResolucion || (exports.TipoResolucion = {}));
var TipoReclamo;
(function (TipoReclamo) {
    TipoReclamo["DesperfectoProducto"] = "DesperfectoProducto";
    TipoReclamo["RepticionIncoveniente"] = "RepticionIncoveniente";
    TipoReclamo["ProductoNoRecibido"] = "ProductoNoRecibido";
    TipoReclamo["ProducoErroneo"] = "ProducoErroneo";
    TipoReclamo["Otro"] = "Otro";
})(TipoReclamo = exports.TipoReclamo || (exports.TipoReclamo = {}));
var EstadoProducto;
(function (EstadoProducto) {
    EstadoProducto["Activo"] = "Activo";
    EstadoProducto["Pausado"] = "Pausado";
    EstadoProducto["BloqueadoADM"] = "BloqueadoADM";
})(EstadoProducto = exports.EstadoProducto || (exports.EstadoProducto = {}));
var EstadoCompra;
(function (EstadoCompra) {
    EstadoCompra["Cancelada"] = "Cancelada";
    EstadoCompra["Completada"] = "Completada";
    EstadoCompra["Confirmada"] = "Confirmada";
    EstadoCompra["EsperandoConfirmacion"] = "EsperandoConfirmacion";
    EstadoCompra["Devolucion"] = "Devolucion";
})(EstadoCompra = exports.EstadoCompra || (exports.EstadoCompra = {}));
