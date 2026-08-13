import { Request, Response } from "express";
import { ValidKey } from "../models/ValidKey";
import { randomInt } from "crypto";

export const generateKey = async (req: Request, res: Response) => {
  try {
    const ip = req.ip || req.headers["x-forwarded-for"] || "unknown";

    // gera chave simples de 4 dígitos
    const key = randomInt(1000, 9999).toString();

    const valid = await ValidKey.create({
      key,
      used: false,
      ip,
      created_at: new Date()
    });

    return res.status(201).json({ key: valid.key });
  } catch (error) {
    console.log("ERRO AO GERAR CHAVE:", error);
    return res.status(500).json({ error: "Não foi possível gerar sua chave." });
  }
};
