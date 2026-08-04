import express from "express";
import cors from "cors";
import professionalRoutes from "./routes/professionalRoutes";
import { sequelize } from "./config/database";
import { syncDatabase } from "./models/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ⭐ SERVIR A PASTA DE IMAGENS
app.use("/uploads", express.static("uploads"));


// ROTAS CORRETAS
app.use("/", professionalRoutes);

const startServer = async () => {
  try {
    await sequelize.authenticate();   // CORRETO
    await syncDatabase();              // CORRETO

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
  }
};

startServer();
