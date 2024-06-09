"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateJWT = void 0;
const jwt = require("jsonwebtoken");
const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    console.log("Token recibido en el backend:", token); // Log para verificar el token recibido
    if (!token) {
        console.log("No hay token en la petición");
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWTSECRET);
        req._id = decoded._id;
        req.usuario = decoded.usuario;
        console.log("Token decodificado correctamente:", decoded);
        next();
    }
    catch (error) {
        console.log("Token inválido:", error);
        return res.status(401).json({
            ok: false,
            msg: "Token Inválido",
        });
    }
};
exports.validateJWT = validateJWT;
//# sourceMappingURL=validate-jwt.js.map