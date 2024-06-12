import { Request, Response } from "express";
import CompraModel from "../models/compra.model";
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(express.json());

export const crearCompra = async (req: Request, res: Response) => {
  const { usuarioId, productos } = req.body;

  try {
    const nuevaCompra = new CompraModel({
      usuarioId,
      productos,
    });

    const compraCreada = await nuevaCompra.save();

    res.status(201).json({
      ok: true,
      msg: "Compra realizada satisfactoriamente",
      compra: compraCreada,
    });
  } catch (error) {
    console.error("Error en crearCompra:", error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al realizar la compra, comuníquese con el administrador",
    });
  }
};

export const getCompras = async (req: Request, res: Response) => {
  try {
    const compras = await CompraModel.find()
      .populate("usuarioId")
      .populate("productos.producto");

    res.json({
      ok: true,
      compras,
    });
  } catch (error) {
    console.error("Error en getCompras:", error);
    res.status(400).json({
      ok: false,
      msg: "Error al consultar las compras",
    });
  }
};

export const getCompra = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const compra = await CompraModel.findById(id)
      .populate("usuarioId")
      .populate("productos.producto");

    res.json({
      ok: true,
      compra,
    });
  } catch (error) {
    console.error("Error en getCompra:", error);
    res.status(400).json({
      ok: false,
      msg: "Error al consultar la compra",
    });
  }
};

export const getComprasPorUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioId = req.params.usuarioId;

    const compras = await CompraModel.find({ usuarioId })
      .populate("usuarioId")
      .populate("productos.producto");

    res.json({
      ok: true,
      compras,
    });
  } catch (error) {
    console.error("Error en getComprasPorUsuario:", error);
    res.status(400).json({
      ok: false,
      msg: "Error al consultar las compras del usuario",
    });
  }
};

export const getProductoEstadisticas = async (req: Request, res: Response) => {
  try {
    const productoId = req.params.id;
    const compras = await CompraModel.find({
      "productos.producto": productoId,
    });

    const totalCompras = compras.length;
    const totalCantidad = compras.reduce((total, compra) => {
      const producto = compra.productos.find(
        (p) => p.producto.toString() === productoId
      );
      return total + (producto ? producto.cantidad : 0);
    }, 0);

    res.json({
      ok: true,
      totalCompras,
      totalCantidad,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al obtener estadísticas del producto",
    });
  }
};
