"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const express_validator_1 = require("express-validator");
const validate_fields_1 = require("../middlewares/validate-fields");
const validate_jwt_1 = require("../middlewares/validate-jwt");
const router = (0, express_1.Router)();
router.post("/", [
    (0, express_validator_1.check)("email", "El correo es obligatorio!").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria!").not().isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.login);
router.post("/register", [
    (0, express_validator_1.check)("nombre", "El nombre es obligatorio").not().isEmpty(),
    (0, express_validator_1.check)("email", "El correo es obligatorio").isEmail(),
    (0, express_validator_1.check)("password", "La contraseña es obligatoria y debe ser de al menos 6 caracteres").isLength({ min: 6 }),
    (0, express_validator_1.check)("numeroDocumento", "El número de documento es obligatorio")
        .not()
        .isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.register);
router.post("/olvidocontrasena", [
    (0, express_validator_1.check)("email", "El correo es obligatorio!").not().isEmpty().isEmail(),
    (0, express_validator_1.check)("numeroDocumento", "El número de documento es obligatorio!")
        .not()
        .isEmpty(),
    validate_fields_1.validateFields,
], auth_controller_1.olvidoContrasena);
router.put("/cambiocontrasena", validate_jwt_1.validateJWT, [(0, express_validator_1.check)("password", "El password es obligatorio").not().isEmpty()], auth_controller_1.cambioContrasena);
exports.default = router;
//# sourceMappingURL=auth.route.js.map