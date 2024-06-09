import { Model, Schema, model } from "mongoose";

const ProductoSchema = new Schema({
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

const ProductoModel: Model<any> = model("productos", ProductoSchema);
export default ProductoModel;
