"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerInformacion = exports.registrarUsuario = exports.iniciarSesion = void 0;
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
var obtenerInformacion = function (uuid) {
    return axios_1.default.get("http://".concat(__1.Auth.endpoint, "/api/usuarios/obtenerInfoUsuarios/") + "aa0f9306-09e8-45ba-9e4e-1cf61528c7fd").then(function (response) {
        return {
            nombre: response.data.nombre,
            apellido: response.data.apellido,
            correo: response.data.correo,
            telefono: response.data.correo,
            imagen: response.data.imagen.data
        };
    })
        .catch(function (error) {
        return { success: false };
    });
};
exports.obtenerInformacion = obtenerInformacion;
