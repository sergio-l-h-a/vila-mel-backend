import { sequelize } from './../config/database';
import { DataTypes } from "sequelize";

export const ValidKey = sequelize.define("ValidKey", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  key: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true
  },
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  ip: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "valid_keys",
  timestamps: false
});
