"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Cargar las variables de entorno
const dbConnection = process.env.DB_CONNECTION;
if (!dbConnection) {
    throw new Error("DB_CONNECTION is not defined in .env file");
}
mongoose_1.default
    .connect(dbConnection)
    .then(() => {
    console.log("Conectado a la base de datos");
    const superadmin = new usuario_model_1.default({
        nombre: "Super Admin",
        email: "superadmin@gmail.com",
        password: bcryptjs_1.default.hashSync("superadminpassword", 10),
        tipoDocumento: "CC",
        numeroDocumento: "10011964333",
        roles: "superadmin",
    });
    return superadmin.save();
})
    .then(() => {
    console.log("Superadministrador creado");
    mongoose_1.default.disconnect();
})
    .catch((err) => {
    console.error("Error:", err);
    mongoose_1.default.disconnect();
});
//# sourceMappingURL=createSuperAdmin.js.map