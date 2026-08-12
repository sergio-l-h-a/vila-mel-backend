import { Request, Response } from "express";
import { Professional } from "../models/Professional";
import { ValidKey } from "../models/ValidKey";

export const deleteProfessional = async (req: Request, res: Response) => {
  try {
    const { key } = req.body;

    const professional = await Professional.findOne({ where: { key } });

    if (!professional) {
      return res.status(404).json({ error: "Profissional não encontrado." });
    }

    // Se já está bloqueado permanentemente
    if (professional.blocked) {
      return res.status(403).json({
        error: "Você foi bloqueado permanentemente e não pode excluir ou cadastrar novamente."
      });
    }

    // Incrementar contador
    professional.deleteCount++;

    // Se atingiu 3 exclusões → bloquear permanentemente
    if (professional.deleteCount >= 3) {
      professional.blocked = true;

      await professional.save();
      await professional.destroy();

        // BLOQUEAR O IP PERMANENTEMENTE
      await ValidKey.create({
        key: `BLOCKED-${professional.key}`, // só para registrar
        ip: professional.ip,               // <-- IP do usuário
        used: true                         // <-- impede gerar chave
    });

      return res.status(403).json({
        error: "Você excluiu sua conta 3 vezes e foi bloqueado permanentemente."
      });
    }

    // Excluir normalmente
    await professional.save();
    await professional.destroy();

    // Liberar chave para gerar outra
    await ValidKey.update(
      { used: false },
      { where: { key } }
    );

    return res.status(200).json({
      message: "Conta excluída com sucesso."
    });

  } catch (error) {
    console.log("ERRO AO EXCLUIR:", error);
    return res.status(500).json({ error: "Erro ao excluir profissional." });
  }
};
