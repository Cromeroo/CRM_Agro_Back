"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const checkRoles_1 = require("../middlewares/checkRoles");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const admin_controller_1 = require("../controllers/admin.controller");
const router = (0, express_1.Router)();
router.get("/users", [validate_jwt_1.validateJWT, (0, checkRoles_1.checkRole)(["superadmin", "admin", "Admin"])], admin_controller_1.getAllUsers);
router.put("/users/:id/role", [validate_jwt_1.validateJWT, (0, checkRoles_1.checkRole)(["superadmin"])], admin_controller_1.updateUserRole);
router.delete("/users/:id", [validate_jwt_1.validateJWT, (0, checkRoles_1.checkRole)(["superadmin"])], admin_controller_1.deleteUser);
exports.default = router;
//# sourceMappingURL=admin.route.js.map