import {
  NextFunction,
  Request,
  Response,
  RequestHandler,
} from "express-serve-static-core";
import { insertNewUser, getUserByEmail } from "../../services/user";

import { MY_ACCESS_TOKEN_SECRET } from "../../config";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  //validation in middleware

  try {
    const { email, password, name } = req.body;

    const bcrypt = require("bcryptjs");
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await insertNewUser(name, email, hashedPassword);

    return res.status(201).json({ message: "Registered successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};

export const login = async (req: Request, res: Response): Promise<any> => {
  //validation in middleware

  try {
    const { email, password } = req.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }

    const bcrypt = require("bcryptjs");
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Email or password is invalid" });
    }
    const jwt = require("jsonwebtoken");
    const accessToken = jwt.sign({ userId: user.id }, MY_ACCESS_TOKEN_SECRET, {
      subject: "accessApi",
      expiresIn: "1h",
    });

    return res.status(200).json({
      id: user.id,
      accessToken,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};
