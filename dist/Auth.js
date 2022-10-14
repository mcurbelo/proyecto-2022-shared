"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endpoint = void 0;
var Endpoint = /** @class */ (function () {
    function Endpoint() {
    }
    Object.defineProperty(Endpoint, "endpoint", {
        get: function () {
            return this._endpoint;
        },
        set: function (value) {
            this._endpoint = value;
        },
        enumerable: false,
        configurable: true
    });
    Endpoint._endpoint = "";
    return Endpoint;
}());
exports.Endpoint = Endpoint;
