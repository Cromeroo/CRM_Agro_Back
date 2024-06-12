import { Model, Schema, model } from "mongoose";

const UsuarioSchema = new Schema({
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
  compras: [
    {
      type: Schema.Types.ObjectId,
      ref: "Compra",
    },
  ],
});

const UsuarioModel: Model<any> = model("Usuario", UsuarioSchema);
export default UsuarioModel;
