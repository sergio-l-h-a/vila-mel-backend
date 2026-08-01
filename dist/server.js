"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const professionalRoutes_1 = __importDefault(require("./routes/professionalRoutes"));
const database_1 = require("./config/database");
const index_1 = require("./models/index");
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// ROTAS CORRETAS
app.use("/", professionalRoutes_1.default);
const startServer = async () => {
    await (0, database_1.connectDatabase)();
    await (0, index_1.syncDatabase)();
    app.listen(PORT, () => {
        console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
};
startServer();
