import { Request, Response } from "express";
import { Professional } from "../models";

export const getProfessionals = async (req: Request, res: Response) => {
  try {
    const professionals = await Professional.findAll();
    res.json(professionals);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar profissionais." });
  }
};

export const createProfessional = async (req: Request, res: Response) => {
  try {
    const { name, profession, phone, gender } = req.body;
    const image = req.file ? req.file.filename : null;
    const professional = await Professional.create({ name, profession, phone, gender, image });
    res.status(201).json(professional);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar profissional." });
  }
};

export const updateProfessional = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Garantir que o ID é válido
    if (Array.isArray(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    const numericId = Number(id);

    if (isNaN(numericId)) {
      return res.status(400).json({ error: "ID deve ser um número." });
    }

    const { name, profession, phone, image, gender } = req.body;

    const professional = await Professional.findByPk(numericId);

    if (!professional) {
      return res.status(404).json({ error: "Profissional não encontrado." });
    }

    professional.name = name ?? professional.name;
    professional.profession = profession ?? professional.profession;
    professional.phone = phone ?? professional.phone;
    professional.image = image ?? professional.image;
    professional.gender = gender ?? professional.gender;

    await professional.save();

    return res.json(professional);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao atualizar profissional." });
  }
};

export const deleteProfessional = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Garantir que o ID não é array
    if (Array.isArray(id)) {
      return res.status(400).json({ error: "ID inválido." });
    }

    // Converter para número
    const numericId = Number(id);

    // Validar se é número
    if (isNaN(numericId)) {
      return res.status(400).json({ error: "ID deve ser um número." });
    }

    const professional = await Professional.findByPk(numericId);

    if (!professional) {
      return res.status(404).json({ error: "Profissional não encontrado." });
    }

    await professional.destroy();

    return res.status(204).send();

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao remover profissional." });
  }
};

