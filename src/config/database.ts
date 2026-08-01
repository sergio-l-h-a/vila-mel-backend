import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT as any,
    logging: false,
  }
);

export const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexão com MySQL estabelecida com sucesso.");
  } catch (error) {
    console.error("Erro ao conectar no MySQL:", error);
  }
};
