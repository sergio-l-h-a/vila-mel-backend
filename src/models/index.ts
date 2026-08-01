import { sequelize } from "../config/database";
import { Professional } from "./Professional";

export const syncDatabase = async () => {
  try {
    await sequelize.sync();
    console.log("Models sincronizados com o banco.");
  } catch (error) {
    console.error("Erro ao sincronizar models:", error);
  }
};

export { Professional };
