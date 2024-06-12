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
exports.getProductoEstadisticas = exports.getComprasPorUsuario = exports.getCompra = exports.getCompras = exports.crearCompra = void 0;
const compra_model_1 = __importDefault(require("../models/compra.model"));
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());
const crearCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { usuarioId, productos } = req.body;
    try {
        const nuevaCompra = new compra_model_1.default({
            usuarioId,
            productos,
        });
        const compraCreada = yield nuevaCompra.save();
        res.status(201).json({
            ok: true,
            msg: "Compra realizada satisfactoriamente",
            compra: compraCreada,
        });
    }
    catch (error) {
        console.error("Error en crearCompra:", error);
        res.status(400).json({
            ok: false,
            error,
            msg: "Error al realizar la compra, comuníquese con el administrador",
        });
    }
});
exports.crearCompra = crearCompra;
const getCompras = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const compras = yield compra_model_1.default.find()
            .populate("usuarioId")
            .populate("productos.producto");
        res.json({
            ok: true,
            compras,
        });
    }
    catch (error) {
        console.error("Error en getCompras:", error);
        res.status(400).json({
            ok: false,
            msg: "Error al consultar las compras",
        });
    }
});
exports.getCompras = getCompras;
const getCompra = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const compra = yield compra_model_1.default.findById(id)
            .populate("usuarioId")
            .populate("productos.producto");
        res.json({
            ok: true,
            compra,
        });
    }
    catch (error) {
        console.error("Error en getCompra:", error);
        res.status(400).json({
            ok: false,
            msg: "Error al consultar la compra",
        });
    }
});
exports.getCompra = getCompra;
const getComprasPorUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usuarioId = req.params.usuarioId;
        const compras = yield compra_model_1.default.find({ usuarioId })
            .populate("usuarioId")
            .populate("productos.producto");
        res.json({
            ok: true,
            compras,
        });
    }
    catch (error) {
        console.error("Error en getComprasPorUsuario:", error);
        res.status(400).json({
            ok: false,
            msg: "Error al consultar las compras del usuario",
        });
    }
});
exports.getComprasPorUsuario = getComprasPorUsuario;
const getProductoEstadisticas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productoId = req.params.id;
        const compras = yield compra_model_1.default.find({
            "productos.producto": productoId,
        });
        const totalCompras = compras.length;
        const totalCantidad = compras.reduce((total, compra) => {
            const producto = compra.productos.find((p) => p.producto.toString() === productoId);
            return total + (producto ? producto.cantidad : 0);
        }, 0);
        res.json({
            ok: true,
            totalCompras,
            totalCantidad,
        });
    }
    catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            msg: "Error al obtener estadísticas del producto",
        });
    }
});
exports.getProductoEstadisticas = getProductoEstadisticas;
//# sourceMappingURL=compra.controller.js.map