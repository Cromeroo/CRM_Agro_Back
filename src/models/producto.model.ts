import { Schema, model, Document } from "mongoose";

interface IProducto extends Document {
  nombre: string;
  referencia: string;
  cantidad: number;
  precio: number;
  imagenUrl: string;
}

const ProductoSchema = new Schema<IProducto>({
  nombre: {
    type: String,
    required: true,
  },
  referencia: {
    type: String,
    required: true,
  },
  cantidad: {
    type: Number,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagenUrl: { type: String },
});

const ProductoModel = model<IProducto>("Producto", ProductoSchema);

export default ProductoModel;
