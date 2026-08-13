import { Router } from "express";
import { upload } from "../middlewares/upload";
import {
  createProfessional,
  loginProfessional,
  updatePhoto,
  updateOwnProfile,
  adminGetProfessionals,
  adminEditProfessional,
  adminDeleteProfessional,
  adminLogin
} from "../controllers/professionalController";
import { Professional } from "../models";
import { generateKey } from "../controllers/keyController";

const router = Router();

// listar profissionais (cards da home)
router.get("/professionals", async (req, res) => {
  const professionals = await Professional.findAll();
  res.json(professionals);
});

// admin — listar todos
router.get("/admin/professionals", adminGetProfessionals);

// gerar chave
router.post("/generate-key", generateKey);

// usuário — cadastrar profissional (com imagem)
router.post("/professionals", upload.single("image"), createProfessional);

// login usuário
router.post("/professionals/login", async (req, res) => {
  const { key } = req.body;

  const professional = await Professional.findOne({ where: { key } });

  if (!professional) {
    return res.status(404).json({ authorized: false });
  }

  return res.json({
    authorized: true,
    professional
  });
});


// login admin
router.post("/admin/login", adminLogin);

// usuário — editar perfil
router.put("/professionals/update", updateOwnProfile);
router.put("/professionals/:id", updateOwnProfile);

// usuário — atualizar foto
router.put("/professionals/update-photo", upload.single("image"), updatePhoto);

// admin — editar profissional
router.put("/admin/professionals/:id", adminEditProfessional);

// admin — deletar profissional
router.delete("/admin/professionals/:id", adminDeleteProfessional);

export default router;
