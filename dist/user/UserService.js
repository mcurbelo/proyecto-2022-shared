"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCuenta = exports.updateImagen = exports.updateContrasena = exports.updateDatosEmpresa = exports.updateUser = exports.obtenerInformacion = exports.reiniciarContrasena = exports.recuperarContrasena = exports.registrarUsuario = exports.iniciarSesion = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var iniciarSesion = function (email, password) {
    return axios_1.default.post("http://".concat(__1.Auth.endpoint, "/api/auth/iniciarSesion"), {
        correo: email,
        password: password
    }).then(function (response) {
        return {
            success: true,
            token: response.data['jwt-token'],
            uuid: (response.data.uuid)
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
                uuid: response.data.uuid
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
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/auth/reiniciarContrasena?token=").concat(tokenReset, "&contrasena").concat(nuevaContrasena)).then(function (response) {
        return response.data;
    })
        .catch(function (error) {
        return error.response.data.message;
    });
};
exports.reiniciarContrasena = reiniciarContrasena;
var obtenerInformacion = function (token, uuid) {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/usuarios/") + uuid + "/infoUsuario").then(function (response) {
        return {
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            correo: response.data.correo,
            telefono: response.data.telefono,
            imagen: response.data.imagen.data,
            datosVendedor: response.data.datosVendedor,
            calificacion: response.data.calificacion
        };
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
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario, "/perfil"), datos)
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
exports.updateDatosEmpresa = updateDatosEmpresa;
var updateContrasena = function (token, idUsuario, datos) {
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario, "/perfil"), datos)
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
exports.updateContrasena = updateContrasena;
var updateImagen = function (token, idUsuario, imagen) {
    var data = new FormData();
    data.append("imagen", imagen);
    return axios_1.default.put("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario, "/perfil/imagen"), data)
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
exports.updateImagen = updateImagen;
var eliminarCuenta = function (token, idUsuario) {
    return axios_1.default.delete("http://".concat(__1.Auth.endpoint, "/api/usuarios/").concat(idUsuario))
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
exports.eliminarCuenta = eliminarCuenta;
