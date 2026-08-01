"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
    logging: false,
});
const connectDatabase = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log("Conexão com MySQL estabelecida com sucesso.");
    }
    catch (error) {
        console.error("Erro ao conectar no MySQL:", error);
    }
};
exports.connectDatabase = connectDatabase;
