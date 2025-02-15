import vine, { errors } from "@vinejs/vine";
import {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express-serve-static-core";

export const validateLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // try {
  //   const reqSchema = vine.object({
  //     email: vine.string().email(),
  //     password: vine.string().minLength(5),
  //   });
  //   const validator = vine.compile(reqSchema);
  //   const validated = await validator.validate(req.body);
  //   req.hasErrors = false;
  // } catch (error) {
  //   if (error instanceof errors.E_VALIDATION_ERROR) {
  //     req.hasErrors = true;
  //     req.Errors = error.messages;
  //     res.status(401).json(req.Errors);
  //     res.end();
  //   }
  // }
  next();
};

export const validateRegister = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // try {
  //   const reqSchema = vine.object({
  //     email: vine.string().email(),
  //     password: vine.string(),
  //     name: vine.string(),
  //   });
  //   const validator = vine.compile(reqSchema);
  //   const validated = await validator.validate(req.body);
  //   req.hasErrors = false;
  // } catch (error) {
  //   if (error instanceof errors.E_VALIDATION_ERROR) {
  //     req.hasErrors = true;
  //     req.Errors = error.messages;
  //     res.status(401).json(req.Errors);
  //     res.end();
  //   }
  // }
  next();
};
