import { sequelize } from "../config/database";
import { Professional } from "./Professional";
import { ValidKey } from "./ValidKey";

export const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log("Banco sincronizado com sucesso.");
  } catch (error) {
    console.error("Erro ao sincronizar models:", error);
  }
};

export { Professional, ValidKey };
