import crypto from "crypto";
import { Request, Response } from "express";
import { PeopleRepository } from "../database/db";

class PeopleController {
  public create = async (req: Request, res: Response) => {
    const { nome, nascimento, apelido, stack } = req.body;

    if (!nome || !nascimento || !apelido || !stack) {
      return res.status(422).end();
    }

    if (typeof nome !== "string" || typeof apelido !== "string") {
      return res.status(400).end();
    }

    if (new Date(nascimento).toString() === "Invalid Date") {
      return res.status(400).end();
    }

    const id = crypto.randomUUID();

    try {
      if (await PeopleRepository.nicknameExists(apelido)) {
        return res.status(422).end();
      }

      await PeopleRepository.create({
        id,
        nome,
        nascimento,
        apelido,
        stack: JSON.stringify(stack),
      });

      return res.status(201).header("Location", `/pessoas/${id}`).end();
    } catch (err) {
      return res.status(500).end();
    }
  };

  public findOne = async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).end();
    }

    try {
      const result = await PeopleRepository.findOne(id);

      if (!result) {
        return res.status(404).end();
      }

      return res.status(200).json({
        id: result.id,
        nome: result.nome,
        nascimento: result.nascimento,
        apelido: result.apelido,
        stack: result.stack,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).end();
    }
  };

  public searchTerm = async (req: Request, res: Response) => {
    const { t: term } = req.query;

    if (!term) {
      return res.status(400).end();
    }

    try {
      const result = await PeopleRepository.searchTerm(term as string);

      return res.status(200).json(result);
    } catch {
      return res.status(500).end();
    }
  };

  public count = async (req: Request, res: Response) => {
    try {
      const result = await PeopleRepository.count();

      return res.status(200).json({ count: result });
    } catch (err) {
      return res.status(500).end();
    }
  };
}

export const peopleController = new PeopleController();
