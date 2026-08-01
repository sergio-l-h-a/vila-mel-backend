"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProfessional = exports.updateProfessional = exports.createProfessional = exports.getProfessionals = void 0;
const models_1 = require("../models");
const getProfessionals = async (req, res) => {
    try {
        const professionals = await models_1.Professional.findAll();
        res.json(professionals);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao listar profissionais." });
    }
};
exports.getProfessionals = getProfessionals;
const createProfessional = async (req, res) => {
    try {
        const { name, profession, phone } = req.body;
        const professional = await models_1.Professional.create({ name, profession, phone });
        res.status(201).json(professional);
    }
    catch (error) {
        res.status(500).json({ error: "Erro ao criar profissional." });
    }
};
exports.createProfessional = createProfessional;
const updateProfessional = async (req, res) => {
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
        const { name, profession, phone } = req.body;
        const professional = await models_1.Professional.findByPk(numericId);
        if (!professional) {
            return res.status(404).json({ error: "Profissional não encontrado." });
        }
        professional.name = name ?? professional.name;
        professional.profession = profession ?? professional.profession;
        professional.phone = phone ?? professional.phone;
        await professional.save();
        return res.json(professional);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao atualizar profissional." });
    }
};
exports.updateProfessional = updateProfessional;
const deleteProfessional = async (req, res) => {
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
        const professional = await models_1.Professional.findByPk(numericId);
        if (!professional) {
            return res.status(404).json({ error: "Profissional não encontrado." });
        }
        await professional.destroy();
        return res.status(204).send();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Erro ao remover profissional." });
    }
};
exports.deleteProfessional = deleteProfessional;
