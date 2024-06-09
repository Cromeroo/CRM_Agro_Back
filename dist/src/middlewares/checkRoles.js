"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (roles) => {
    return (req, res, next) => {
        const { usuario } = req;
        if (!usuario) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        const hasRole = roles.some((role) => usuario.roles.includes(role));
        if (!hasRole) {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
exports.checkRole = checkRole;
//# sourceMappingURL=checkRoles.js.map