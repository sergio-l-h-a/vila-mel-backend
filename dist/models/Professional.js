"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Professional = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
class Professional extends sequelize_1.Model {
}
exports.Professional = Professional;
Professional.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    profession: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(20),
        allowNull: false,
    },
}, {
    sequelize: database_1.sequelize,
    tableName: "professionals",
    timestamps: false,
});
