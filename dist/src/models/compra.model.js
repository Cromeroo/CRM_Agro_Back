"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CompraSchema = new mongoose_1.Schema({
    usuarioId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Usuario",
        required: true,
    },
    productos: [
        {
            producto: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Producto",
                required: true,
            },
            cantidad: {
                type: Number,
                required: true,
            },
        },
    ],
    fecha: {
        type: Date,
        default: Date.now,
    },
});
const CompraModel = (0, mongoose_1.model)("Compra", CompraSchema);
exports.default = CompraModel;
//# sourceMappingURL=compra.model.js.map