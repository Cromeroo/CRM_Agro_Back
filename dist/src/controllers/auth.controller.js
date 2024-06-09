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
exports.cambioContrasena = exports.olvidoContrasena = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const email_1 = __importDefault(require("../helpers/email"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nombre, email, password, tipoDocumento, numeroDocumento } = req.body;
    try {
        const existeEmail = yield usuario_model_1.default.findOne({ email: email });
        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El email ya está registrado",
            });
        }
        const usuario = new usuario_model_1.default({
            nombre,
            email,
            password: bcryptjs_1.default.hashSync(password, bcryptjs_1.default.genSaltSync()),
            tipoDocumento,
            numeroDocumento,
            roles: ["usuario"],
        });
        yield usuario.save();
        const token = yield (0, jwt_1.default)(usuario._id, usuario.email, usuario.roles);
        res.status(201).json({
            ok: true,
            usuario,
            token,
        });
    }
    catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error al registrar el usuario, hable con el administrador",
            error: error.message, // Incluir mensaje de error en la respuesta
        });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        // Verificar el email
        const usuario = yield usuario_model_1.default.findOne({ email: email });
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son válidas",
            });
        }
        // Verificar el password
        const validarPassword = bcryptjs_1.default.compareSync(password, usuario.password);
        if (!validarPassword) {
            return res.status(401).json({
                ok: false,
                msg: "Las credenciales no son válidas",
            });
        }
        // Generar Token
        const token = yield (0, jwt_1.default)(usuario._id, usuario.email, usuario.roles, {
            nombre: usuario.nombre,
        });
        res.status(200).json({
            ok: true,
            usuario,
            token,
        });
    }
    catch (error) {
        res.status(400).json({
            ok: false,
            error,
            msg: "Hable con el administrador",
        });
    }
});
exports.login = login;
const olvidoContrasena = (req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, numeroDocumento } = req.body;
    try {
        const existeUsuario = yield usuario_model_1.default.findOne({
            email,
            numeroDocumento,
        });
        if (!existeUsuario) {
            resp.status(400).json({
                ok: false,
                msg: "Los datos no coinciden",
            });
            return;
        }
        const id = existeUsuario === null || existeUsuario === void 0 ? void 0 : existeUsuario._id;
        if (id) {
            // Generar Token
            const token = yield (0, jwt_1.default)(id, email, ["usuario"], // Suponiendo que solo asignas rol de usuario en olvido de contraseña
            { expiresIn: "1h" });
            // Guardar el Token
            existeUsuario.token = token;
            yield existeUsuario.save();
            const nombre = existeUsuario.nombre;
            const templatePath = path_1.default.join(__dirname, "../templates/olvidoContrasena.html");
            const emailTemplate = fs_1.default.readFileSync(templatePath, "utf8");
            const resetLink = `http://localhost:4200/reset-password?token=${encodeURIComponent(String(token))}`;
            const personalizarEmail = emailTemplate
                .replace("{{name}}", nombre)
                .replace("{{token}}", resetLink);
            (0, email_1.default)(email, "Cambio de contraseña", personalizarEmail);
            resp.status(200).json({
                ok: true,
                msg: "Proceso éxitoso",
                usuario: existeUsuario,
            });
        }
    }
    catch (error) {
        console.error(error);
        resp.status(400).json({
            ok: false,
            msg: "No se logró validar sus datos",
            error: error.message,
        });
    }
});
exports.olvidoContrasena = olvidoContrasena;
const cambioContrasena = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req._id;
    const { password } = req.body;
    const tokenPass = req.header("x-token");
    try {
        if (!password || !tokenPass) {
            return res.status(400).json({
                ok: false,
                msg: "Valores invalidos",
            });
        }
        const usuario = yield usuario_model_1.default.findOne({ token: tokenPass });
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: "El token ya fue utilizado",
            });
        }
        const newPassword = bcryptjs_1.default.hashSync(password, 10);
        const actualizarPassword = yield usuario_model_1.default.findByIdAndUpdate(id, {
            password: newPassword,
            token: "",
        }, { new: true });
        if (!actualizarPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Error al actualizar la contraseña",
            });
        }
        return res.status(200).json({
            ok: true,
            msg: "Contraseña actualizada",
        });
    }
    catch (error) {
        console.error(error);
        return res.status(400).json({
            ok: false,
            msg: "Error al actualizar la contraseña, hable con el administrador",
        });
    }
});
exports.cambioContrasena = cambioContrasena;
//# sourceMappingURL=auth.controller.js.map