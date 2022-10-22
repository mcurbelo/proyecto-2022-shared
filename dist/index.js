"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = exports.VendedorService = exports.CardService = exports.UserService = void 0;
exports.UserService = require("./user/UserService");
exports.CardService = require("./cards/CardsService");
exports.VendedorService = require("./user/VendedorService");
var Auth_1 = require("./Auth");
Object.defineProperty(exports, "Auth", { enumerable: true, get: function () { return Auth_1.Endpoint; } });
