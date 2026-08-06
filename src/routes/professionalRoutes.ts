import { Router } from "express";
import { upload } from "../middlewares/upload";

import {
  createProfessional,
  login,
  updatePhoto,
  updateOwnProfile,
  adminGetProfessionals,
  adminEditProfessional,
  adminDeleteProfessional,
  adminLogin
} from "../controllers/professionalController";

const router = Router();

// ======================================================
// 📌 ADMIN — LISTAR TODOS OS PROFISSIONAIS
// ======================================================
router.get("/admin/professionals", adminGetProfessionals);

// ======================================================
// 📌 USUÁRIO — CADASTRAR PROFISSIONAL
// ======================================================
router.post("/professionals", upload.single("image"), createProfessional);

// ======================================================
// 📌 USUÁRIO — LOGIN
// ======================================================
router.post("/professionals/login", login);

router.post("/admin/login", adminLogin);


// ======================================================
// 📌 USUÁRIO — EDITAR O PRÓPRIO PERFIL
// ======================================================
router.put("/professionals/update", updateOwnProfile);

// ======================================================
// 📌 USUÁRIO — ATUALIZAR FOTO (limite de 3 vezes)
// ======================================================
router.put("/professionals/update-photo", upload.single("image"), updatePhoto);

// ======================================================
// 📌 ADMIN — EDITAR QUALQUER PROFISSIONAL
// ======================================================
router.put("/admin/professionals/:id", adminEditProfessional);

// ======================================================
// 📌 ADMIN — DELETAR PROFISSIONAL
// ======================================================
router.delete("/admin/professionals/:id", adminDeleteProfessional);

export default router;
