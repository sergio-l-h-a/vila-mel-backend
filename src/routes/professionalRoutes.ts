import { upload } from "../middlewares/upload";
import { Router } from "express";
import {
  getProfessionals,
  createProfessional,
  updateProfessional,
  deleteProfessional,
} from "../controllers/professionalController";

const router = Router();

router.get("/professionals", getProfessionals);
router.post("/professionals", upload.single("image"), createProfessional);

router.put("/professionals/:id", updateProfessional);
router.delete("/professionals/:id", deleteProfessional);

export default router;
