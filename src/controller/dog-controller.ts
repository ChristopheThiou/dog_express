import { Router } from "express";
import { dogRepository } from "../repository/dog-repository";
import Joi from "joi";

export const dogController = Router();

dogController.get("/", async (req, res) => {
  const dogs = await dogRepository.findAll();
  res.json(dogs);
});

dogController.post("/", async (req, res) => {
  const validation = dogValidation.validate(req.body, { abortEarly: false });
  if (validation.error) {
    res.status(400).json(validation.error);
    return;
  }
  const dog = await dogRepository.persist(req.body);
  res.status(201).json(dog);
});

const dogValidation = Joi.object({
  name: Joi.string().required(),
  bredd: Joi.string().required(),
  birthdate: Joi.string().required(),
});
