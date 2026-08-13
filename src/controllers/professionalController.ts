import { Request, Response } from "express";
import { Professional } from "../models";
import { ValidKey } from "../models/ValidKey";

const ADMIN_KEY = process.env.ADMIN_KEY || "";

// ADMIN — LISTAR PROFISSIONAIS
export const adminGetProfessionals = async (req: Request, res: Response) => {
  const adminKey = req.headers.authorization;

  if (adminKey !== ADMIN_KEY) {
    return res.status(403).json({ error: "Apenas o administrador pode consultar." });
  }
  console.log("Lista de profissionais AQUI!")
  const professionals = await Professional.findAll();
  res.json(professionals);
};


// CADASTRAR PROFISSIONAL
export const createProfessional = async (req: Request, res: Response) => {
  try {
    const { name, profession, phone, gender, key } = req.body;

    // valida se body chegou
    if (!name || !profession || !phone || !gender || !key) {
      console.log("BODY INCOMPLETO:", req.body);
      return res.status(400).json({ error: "Dados incompletos para cadastro." });
    }

    // validar chave
    const valid = await ValidKey.findOne({ where: { key } });

    if (!valid) {
      return res.status(403).json({
        error: "Chave inválida. Você não pode cadastrar."
      });
    }

    if (valid.used) {
      return res.status(409).json({
        error: "Esta chave já foi usada para um cadastro."
      });
    }

    // imagem vinda do CloudinaryStorage (URL em path)
    const file = req.file as any;
    const image = file ? file.path : null;

    const professional = await Professional.create({
      name,
      profession,
      phone,
      gender,
      key,
      image,
      deleteCount: 0,
      blocked: false
    });

    valid.used = true;
    await valid.save();

    return res.status(201).json(professional);
  } catch (error) {
    console.log("ERRO AO CADASTRAR:", error);
    return res.status(500).json({ error: "Erro ao cadastrar profissional." });
  }
};

// LOGIN DO USUÁRIO

export const loginProfessional = async (req: Request, res: Response) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({ error: "Informe sua chave." });
    }

    const professional = await Professional.findOne({ where: { key } });

    if (!professional) {
      return res.status(404).json({ error: "Profissional não encontrado." });
    }

    if (professional.blocked) {
      return res.status(403).json({ error: "Conta bloqueada." });
    }

    return res.json(professional);
  } catch (error) {
    console.log("ERRO AO FAZER LOGIN:", error);
    return res.status(500).json({ error: "Erro ao fazer login." });
  }
};




// EDITAR PERFIL
export const updateOwnProfile = async (req: Request, res: Response) => {
  const { name, profession, phone, gender, key } = req.body;

  const professional = await Professional.findOne({ where: { key } });

  if (!professional) {
    return res.status(404).json({ error: "Usuário não encontrado." });
  }

  professional.name = name || professional.name;
  professional.profession = profession || professional.profession;
  professional.phone = phone || professional.phone;
  professional.gender = gender || professional.gender;
  professional.key = key || professional.key;

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

  const image = req.file ? (req.file as any).path : null;

  professional.image = image;


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
