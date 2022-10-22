"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registrarUsuario = exports.iniciarSesion = void 0;
var axios_1 = require("axios");
var __1 = require("..");
var iniciarSesion = function (email, password) {
    return axios_1.default.post("http://" + __1.Auth.endpoint + "/api/auth/iniciarSesion", {
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
    return axios_1.default.post("http://" + __1.Auth.endpoint + "/api/auth/registrarse", datos)
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
