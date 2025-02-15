import vine, { errors } from "@vinejs/vine";
import { NextFunction, Request, Response } from "express-serve-static-core";

export const validateAddCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqSchema = vine.object({
      name: vine.string().toLowerCase(),
      symbol: vine.string().maxLength(3),
      code: vine.string().toUpperCase().minLength(3),
    });
    const validator = vine.compile(reqSchema);
    const validated = await validator.validate(req.body);
    req.hasErrors = false;
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      req.hasErrors = true;
      req.Errors = error.messages;
    }

    res.status(401).json(req.Errors);
    res.end();
  }
  next();
};

export const validateUpdateCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqSchema = vine.object({
      id: vine.number(),
      name: vine.string().toLowerCase(),
      symbol: vine.string().maxLength(3),
      code: vine.string().toUpperCase().minLength(3),
    });
    const validator = vine.compile(reqSchema);
    const { name, symbol, code } = req.body;
    const { id } = req.params;
    const validated = await validator.validate({ id, name, symbol, code });
    req.hasErrors = false;
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      req.hasErrors = true;
      req.Errors = error.messages;
      //add errors to the response
      res.status(401).json(req.Errors);
      res.end();
    }
  }
  next();
};
