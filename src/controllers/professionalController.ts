import { Request, Response } from "express";
import { Professional } from "../models";

const ADMIN_KEY = process.env.ADMIN_KEY || "";

// ADMIN — LISTAR PROFISSIONAIS
export const adminGetProfessionals = async (req: Request, res: Response) => {
  const adminKey = req.headers.authorization;

  if (adminKey !== ADMIN_KEY) {
    return res.status(403).json({ error: "Apenas o administrador pode consultar." });
  }

  const professionals = await Professional.findAll();
  res.json(professionals);
};

// LOGIN DO USUÁRIO
export const login = async (req: Request, res: Response) => {
  try {
    const { key } = req.body;

    const professional = await Professional.findOne({ where: { key } });

    if (!professional) {
      return res.status(404).json({ authorized: false });
    }

    return res.json({
      authorized: true,
      professional
    });

  } catch (error) {
    return res.status(500).json({ error: "Erro no login." });
  }
};

// CADASTRAR PROFISSIONAL
export const createProfessional = async (req: Request, res: Response) => {
  try {
    const { name, profession, phone, gender, key } = req.body;

    const image = req.file ? (req.file as any).path : null;

    const professional = await Professional.create({
      name,
      profession,
      phone,
      gender,
      key,
      image,
      photoChanges: 0
    });

    return res.status(201).json(professional);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Erro ao cadastrar profissional." });
  }
};

// EDITAR PERFIL
export const updateOwnProfile = async (req: Request, res: Response) => {
  const { key, name, profession, phone, gender } = req.body;

  const professional = await Professional.findOne({ where: { key } });

  if (!professional) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  professional.name = name || professional.name;
  professional.profession = profession || professional.profession;
  professional.phone = phone || professional.phone;
  professional.gender = gender || professional.gender;

  await professional.save();

  res.json({ success: true, professional });
};

// ATUALIZAR FOTO (CORRIGIDO)
export const updatePhoto = async (req: Request, res: Response) => {
  const { key } = req.body;

  const professional = await Professional.findOne({ where: { key } });

  if (!professional) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  if (professional.photoChanges >= 3) {
    return res.status(403).json({ error: "Limite de edições atingido." });
  }

  const image = req.file ? (req.file as any).path : null;

  professional.image = image;
  professional.photoChanges += 1;

  await professional.save();

  res.json({ success: true, professional });
};

// ADMIN — DELETAR
export const adminDeleteProfessional = async (req: Request, res: Response) => {
  try {
    const adminKey = req.headers.authorization;

    if (adminKey !== ADMIN_KEY) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    const { id } = req.params;
    const numericId = Number(id);

    const professional = await Professional.findByPk(numericId);

    if (!professional) {
      return res.status(404).json({ error: "Profissional não encontrado." });
    }

    await professional.destroy();

    return res.json({ success: true });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao deletar profissional." });
  }
};

// ADMIN — EDITAR
export const adminEditProfessional = async (req: Request, res: Response) => {
  try {
    const adminKey = req.headers.authorization;

    if (adminKey !== ADMIN_KEY) {
      return res.status(403).json({ error: "Acesso negado." });
    }

    const { id } = req.params;
    const { name, profession, phone, gender } = req.body;
    const numericId = Number(id);
    const professional = await Professional.findByPk(numericId);

    if (!professional) {
      return res.status(404).json({ error: "Profissional não encontrado." });
    }

    professional.name = name || professional.name;
    professional.profession = profession || professional.profession;
    professional.phone = phone || professional.phone;
    professional.gender = gender || professional.gender;

    await professional.save();

    return res.json({ success: true, professional });

  } catch (error) {
    return res.status(500).json({ error: "Erro ao editar profissional." });
  }
};

// ADMIN — LOGIN
export const adminLogin = (req: Request, res: Response) => {
  const { key } = req.body;

  if (key === ADMIN_KEY) {
    return res.json({
      authorized: true,
      role: "admin"
    });
  }

  return res.status(401).json({
    authorized: false,
    message: "Chave de administrador inválida"
  });
};
