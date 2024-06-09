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
const usuario_model_1 = __importDefault(require("../../src/models/usuario.model"));
function migrateUserRoles() {
    return __awaiter(this, void 0, void 0, function* () {
        const usuarios = yield usuario_model_1.default.find();
        for (const usuario of usuarios) {
            if (typeof usuario.roles === "string") {
                usuario.roles = [usuario.roles];
                yield usuario.save();
            }
        }
    });
}
migrateUserRoles()
    .then(() => {
    console.log("Migración completada.");
})
    .catch((err) => {
    console.error("Error durante la migración:", err);
});
//# sourceMappingURL=useract.js.map