"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connection_1 = require("./database/connection");
const cors_1 = __importDefault(require("cors"));
const usuario_route_1 = __importDefault(require("./routes/usuario.route"));
const producto_route_1 = __importDefault(require("./routes/producto.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const interaction_route_1 = __importDefault(require("./routes/interaction.route"));
const role_route_1 = __importDefault(require("./routes/role.route"));
const protected_route_1 = __importDefault(require("./routes/protected.route"));
const admin_route_1 = __importDefault(require("./routes/admin.route"));
const body_parser_1 = __importDefault(require("body-parser"));
const compra_route_1 = __importDefault(require("./routes/compra.route"));
const path_1 = __importDefault(require("path"));
class Server {
    constructor() {
        this.apiPaths = {
            usuario: "/api/v1/usuario",
            producto: "/api/v1/producto",
            login: "/api/v1/login",
            interaction: "/api/v1/interaction",
            role: "/api/v1/roles",
            protected: "/api/v1/protected",
            admin: "/api/v1/admin",
            compra: "/api/v1/producto/compras",
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "3000";
        //Base de datos
        (0, connection_1.dbConnection)();
        //Métodos Iniciales
        this.middlewares();
        // Rutas
        this.routes();
    }
    miPrimerApi() {
        this.app.get("/", (req, res) => {
            console.log("GET / endpoint hit");
            res.status(200).json({ msg: "Api funcionando" });
        });
    }
    middlewares() {
        this.app.use((0, cors_1.default)());
        // Lectura del Body
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.json());
        // Servir archivos estáticos
        this.app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
        this.miPrimerApi();
    }
    routes() {
        this.app.use(this.apiPaths.usuario, usuario_route_1.default);
        this.app.use(this.apiPaths.producto, producto_route_1.default);
        this.app.use(this.apiPaths.login, auth_route_1.default);
        this.app.use(this.apiPaths.interaction, interaction_route_1.default);
        this.app.use(this.apiPaths.role, role_route_1.default);
        this.app.use(this.apiPaths.protected, protected_route_1.default);
        this.app.use(this.apiPaths.admin, admin_route_1.default);
        this.app.use(this.apiPaths.compra, compra_route_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo por el puerto", this.port);
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map