"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkRoles_1 = require("../middlewares/checkRoles");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.get("/protected-route", [validate_jwt_1.validateJWT, (0, checkRoles_1.checkRole)(["admin", "superadmin"])], (req, res) => {
    console.log("Ruta protegida alcanzada");
    res
        .status(200)
        .json({ message: "You have access to this protected route!" });
});
exports.default = router;
//# sourceMappingURL=protected.route.js.map