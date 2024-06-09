"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerUbicacionPorIp = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const enviroment = config_1.config[process.env.NODE_ENV || "desarrollo"];
const ipApiBaseUrl = enviroment.ipApi;
const obtenerUbicacionPorIp = (ipAddress_1, ...args_1) => __awaiter(void 0, [ipAddress_1, ...args_1], void 0, function* (ipAddress, apiBaseUrl = ipApiBaseUrl) {
    try {
        const response = yield axios_1.default.get(`${apiBaseUrl}/${ipAddress}`);
        if (response.data.status !== "succes") {
            throw new Error("La solicitud no fue exitosa" + response.data.message);
        }
        console.log("respuesta de la Ip", response);
        return response.data;
    }
    catch (error) {
        console.error("Error al obtener la ubicacion por Ip", error);
        throw error;
    }
});
exports.obtenerUbicacionPorIp = obtenerUbicacionPorIp;
//# sourceMappingURL=obtenerDireccionip.js.map