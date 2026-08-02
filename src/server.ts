import express from "express";
import cors from "cors";
import professionalRoutes from "./routes/professionalRoutes";
import { connectDatabase } from "./config/database";
import { syncDatabase } from "./models/index";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ROTAS CORRETAS
app.use("/", professionalRoutes);

const startServer = async () => {
  await connectDatabase();
  await syncDatabase();

  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
};

startServer();
