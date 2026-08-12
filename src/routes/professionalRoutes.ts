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

// LISTAR PROFISSIONAIS
router.get("/professionals", async (req, res) => {
  const professionals = await Professional.findAll();
  res.json(professionals);
});

// ADMIN — LISTAR TODOS
router.get("/admin/professionals", adminGetProfessionals);

router.post("/generate-key", generateKey);

// USUÁRIO — CADASTRAR PROFISSIONAL
router.post("/professionals", upload.single("image"), createProfessional);

// LOGIN USUÁRIO
router.post("/professionals/login", loginProfessional);

// LOGIN ADMIN
router.post("/admin/login", adminLogin);

// USUÁRIO — EDITAR PERFIL
router.put("/professionals/update", updateOwnProfile);

router.put("/professionals/:id", updateOwnProfile);


// USUÁRIO — ATUALIZAR FOTO
router.put("/professionals/update-photo", upload.single("image"), updatePhoto);

// ADMIN — EDITAR PROFISSIONAL
router.put("/admin/professionals/:id", adminEditProfessional);

// ADMIN — DELETAR PROFISSIONAL
router.delete("/admin/professionals/:id", adminDeleteProfessional);

export default router;
