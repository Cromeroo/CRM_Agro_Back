"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProductoSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        required: true,
    },
    referencia: {
        type: String,
        required: true,
        unique: true,
    },
    tipoDeProducto: {
        type: String,
    },
    cantidad: { type: Number, required: true },
    precio: { type: Number, required: true },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
const ProductoModel = (0, mongoose_1.model)("productos", ProductoSchema);
exports.default = ProductoModel;
//# sourceMappingURL=producto.model.js.map