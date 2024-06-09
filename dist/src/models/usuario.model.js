"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UsuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    tipoDocumento: { type: String, required: true },
    numeroDocumento: { type: String, required: true, unique: true },
    numeroCelular: { type: Number },
    producto: { type: String },
    fechaCompra: { type: Date },
    password: { type: String, required: true },
    roles: { type: [String], default: ["USER"] },
    createdAt: { type: Date, default: Date.now },
    token: {
        type: String,
        default: "",
    },
});
const UsuarioModel = (0, mongoose_1.model)("Usuario", UsuarioSchema);
exports.default = UsuarioModel;
//# sourceMappingURL=usuario.model.js.map