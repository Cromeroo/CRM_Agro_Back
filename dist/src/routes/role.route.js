"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const role_controller_1 = require("../controllers/role.controller");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const checkRoles_1 = require("../middlewares/checkRoles");
const router = (0, express_1.Router)();
router.post("/assign-role", [validate_jwt_1.validateJWT, (0, checkRoles_1.checkRole)(["superadmin"])], role_controller_1.assignRole);
exports.default = router;
//# sourceMappingURL=role.route.js.map