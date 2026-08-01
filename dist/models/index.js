"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professional = exports.syncDatabase = void 0;
const database_1 = require("../config/database");
const Professional_1 = require("./Professional");
Object.defineProperty(exports, "Professional", { enumerable: true, get: function () { return Professional_1.Professional; } });
const syncDatabase = async () => {
    try {
        await database_1.sequelize.sync();
        console.log("Models sincronizados com o banco.");
    }
    catch (error) {
        console.error("Erro ao sincronizar models:", error);
    }
};
exports.syncDatabase = syncDatabase;
