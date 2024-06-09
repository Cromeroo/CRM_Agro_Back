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
exports.assignRole = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const assignRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, roles } = req.body;
    try {
        const usuario = yield usuario_model_1.default.findOne({ email });
        if (!usuario) {
            return res.status(404).json({ message: "User not found" });
        }
        usuario.roles = roles;
        yield usuario.save();
        res.status(200).json({ message: "Roles updated successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.assignRole = assignRole;
//# sourceMappingURL=role.controller.js.map