"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rol = exports.EstadoSolicitud = exports.eliminarCuenta = exports.updateImagen = exports.updateContrasena = exports.updateDatosEmpresa = exports.updateUser = exports.obtenerInformacion = exports.verificarCodigo = exports.reiniciarContrasena = exports.recuperarContrasena = exports.registrarUsuario = exports.iniciarSesion = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var iniciarSesion = function (email, password, tokenWeb, tokenMobile) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/auth/iniciarSesion"), {
        correo: email,
        password: password,
        tokenWeb: tokenWeb,
        tokenMobile: tokenMobile
    }).then(function (response) {
        return {
            success: true,
            token: response.data['jwt-token'],
            uuid: (response.data.uuid),
            rol: (response.data.rol)
        };
    })
        .catch(function (error) {
        return { success: false };
    });
};
exports.iniciarSesion = iniciarSesion;
var registrarUsuario = function (datos) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/auth/registrarse"), datos)
        .then(function (response) {
        if (response.data.success) {
            return {
                success: true,
                token: response.data.token,
                uuid: response.data.uuid,
                rol: response.data.rol
            };
        }
        else {
            return {
                success: false,
                error: response.data.errorMessage
            };
        }
    })
        .catch(function (error) {
        return { success: false };
    });
};
exports.registrarUsuario = registrarUsuario;
var recuperarContrasena = function (correo) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/auth/recuperarContrasena?correo=").concat(correo)).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.recuperarContrasena = recuperarContrasena;
var reiniciarContrasena = function (tokenReset, nuevaContrasena) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/auth/reiniciarContrasena?token=").concat(tokenReset), { contrasena: nuevaContrasena }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.reiniciarContrasena = reiniciarContrasena;
var verificarCodigo = function (tokenReset) {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/auth/verificarCodigo?codigo=").concat(tokenReset)).then(function (response) {
        return response.data;
    }).catch(function (error) {
        return error.response.data.message;
    });
};
exports.verificarCodigo = verificarCodigo;
var obtenerInformacion = function (token, uuid) {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/usuarios/") + uuid + "/infoUsuario", {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    }).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        if (error.response.status == 500) {
            return "Error en el servidor";
        }
        else {
            return error.response.data.message;
        }
    });
};
exports.obtenerInformacion = obtenerInformacion;
var updateUser = function (token, datos) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/usuarios/") + datos.uuid + "/infoBasica", {
        "apellido": datos.apellido,
        "correo": datos.correo,
        "nombre": datos.nombre,
        "telefono": datos.telefono,
        "imagen": {
            "data": datos.imagen.data
        }
    }, {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    })
        .then(function (response) {
        return {
            success: true
        };
    })
        .catch(function (error) {
        if (error.response.status.toString() === "500") {
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
exports.updateUser = updateUser;
var updateDatosEmpresa = function (token, idUsuario, datos) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario, "/perfil"), datos, {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    })
        .then(function (response) {
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
exports.updateDatosEmpresa = updateDatosEmpresa;
var updateContrasena = function (token, idUsuario, datos) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario, "/perfil"), datos, {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    })
        .then(function (response) {
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
exports.updateContrasena = updateContrasena;
var updateImagen = function (token, idUsuario, imagen) {
    var data = new FormData();
    data.append("imagen", imagen);
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario, "/perfil/imagen"), data, {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    })
        .then(function (response) {
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
exports.updateImagen = updateImagen;
var eliminarCuenta = function (token, idUsuario) {
    return axios_1.default.delete("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario), {
        headers: {
            authorization: "Bearer ".concat(token)
        }
    })
        .then(function (response) {
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
exports.eliminarCuenta = eliminarCuenta;
var EstadoSolicitud;
(function (EstadoSolicitud) {
    EstadoSolicitud["Aceptado"] = "Aceptado";
    EstadoSolicitud["Pendiente"] = "Pendiente";
    EstadoSolicitud["NoSolicitada"] = "NoSolicitada";
})(EstadoSolicitud = exports.EstadoSolicitud || (exports.EstadoSolicitud = {}));
var Rol;
(function (Rol) {
    Rol["Vendedor"] = "Vendedor";
    Rol["ADM"] = "ADM";
    Rol["Comprador"] = "Comprador";
})(Rol = exports.Rol || (exports.Rol = {}));
