import { Request, Response } from "express";
import ProductoModel from "../models/producto.model";

export const crearProducto = async (req: Request, res: Response) => {
  const { body } = req;
  const imagenUrl = req.file ? `/uploads/${req.file.filename}` : null; // Aquí guardamos solo la ruta relativa

  try {
    const newProducto = new ProductoModel({
      ...body,
      imagenUrl, // Solo el nombre del archivo
    });

    const productoCreado = await newProducto.save();

    res.status(200).json({
      ok: true,
      msg: "Producto creado satisfactoriamente",
      producto: productoCreado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      error,
      msg: "Error al crear el producto, comuniquese con el administrador",
    });
  }
};

export const getProductos = async (req: Request, res: Response) => {
  try {
    const productos = await ProductoModel.find();

    res.json({
      ok: true,
      productos,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los productos",
    });
  }
};

export const getUnProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const producto = await ProductoModel.findById({ _id: id });

    res.json({
      ok: true,
      producto,
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: "Error al consultar los productos",
    });
  }
};

export const updateProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { body } = req;
    const imagenUrl = req.file
      ? `/uploads/${req.file.filename}`
      : body.imagenUrl;

    const productoActualizado = await ProductoModel.findByIdAndUpdate(
      id,
      {
        ...body,
        imagenUrl,
      },
      {
        new: true,
      }
    );

    res.json({
      ok: true,
      msg: "Producto Actualizado",
      producto: productoActualizado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al actualizar el producto",
    });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const productoEliminado = await ProductoModel.findByIdAndDelete({
      _id: id,
    });

    res.json({
      ok: true,
      msg: "Producto Eliminado",
      producto: productoEliminado,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      msg: "Error al eliminar el producto",
    });
  }
};
