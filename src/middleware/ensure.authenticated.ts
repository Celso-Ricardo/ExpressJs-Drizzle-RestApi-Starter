import { NextFunction, Request, Response } from "express-serve-static-core";
import { MY_ACCESS_TOKEN_SECRET } from "../config";
import { verify } from "jsonwebtoken";

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): any {
  const accessToken = req.headers.authorization;
  req.user = false;

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not found" });
  }

  try {
    const decodedAccessToken: any = verify(
      accessToken,
      MY_ACCESS_TOKEN_SECRET!,
    );
    req.user = decodedAccessToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: "Access token invalid or expired" });
    res.end();
  }
}
