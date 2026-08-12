import { Request, Response } from "express";
import { ValidKey } from "../models/ValidKey";
import crypto from "crypto";

export const generateKey = async (req: Request, res: Response) => {
  try {
    const ip = req.ip;

    // Verificar se esse IP já tem uma chave usada (cadastro ativo)
    const usedKey = await ValidKey.findOne({ where: { ip, used: true } });

    if (usedKey) {
    return res.status(403).json({
        error: "Este IP já possui um cadastro ativo. Não é possível gerar outra chave."
    });
    }

    // Verificar se esse IP já tem uma chave não usada (chave pendente)
    const pendingKey = await ValidKey.findOne({ where: { ip, used: false } });

    if (pendingKey) {
    return res.status(403).json({
        error: "Você já possui uma chave pendente. Use ela para cadastrar."
    });
    }


    // Gerar chave única (ex: 4 dígitos)
    const key = crypto.randomInt(1000, 9999).toString();

    // Salvar chave no banco
    const newKey = await ValidKey.create({
      key,
      ip,
      used: false
    });

    return res.status(201).json({
      key: newKey.key,
      message: "Chave gerada com sucesso."
    });

  } catch (error) {
    console.log("ERRO AO GERAR CHAVE:", error);
    return res.status(500).json({ error: "Erro ao gerar chave." });
  }
};
