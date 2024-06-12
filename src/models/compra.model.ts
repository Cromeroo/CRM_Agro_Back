import { Schema, model, Document } from "mongoose";

interface IProducto {
  producto: Schema.Types.ObjectId;
  cantidad: number;
}

interface ICompra extends Document {
  usuarioId: Schema.Types.ObjectId;
  productos: IProducto[];
  fecha: Date;
}

const CompraSchema = new Schema<ICompra>({
  usuarioId: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  productos: [
    {
      producto: {
        type: Schema.Types.ObjectId,
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

const CompraModel = model<ICompra>("Compra", CompraSchema);

export default CompraModel;
