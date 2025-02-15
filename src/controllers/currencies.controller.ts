import { NextFunction, Request, Response } from "express-serve-static-core";
import {
  getAllCurrencies,
  getCurrencyById,
  insertNewCurrencie,
  editCurrency,
  removeCurrency,
} from "../services/currencies";
import type { Currency } from "../db/postgresql_schema";

export const getCurrencies = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const data = await getAllCurrencies();

    if (data) res.status(200).json({ data });

    res.status(401).json("Currencies not found in our database");
    res.end();
  } catch (error: any) {
    res.status(401).json({ message: error.message });
    res.end();
  }
};

export const getCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const currency_id = req.params.id;

  try {
    const currency: Currency | false = await getCurrencyById(
      Number(currency_id),
    );

    if (currency) {
      res.status(200).json(currency);
      res.end();
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};

export const addCurrency = async (
  req: Request,
  res: Response,
): Promise<any> => {
  //Validation in middleware

  const { name, code, symbol } = req.body;
  const newCurrency = await insertNewCurrencie(name, symbol, code);
  res.status(200).json(newCurrency);
  res.end();
};

export const updateCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  //Validation in middleware

  const { id } = req.params;

  try {
    const { name, code, symbol } = req.body;

    const cur: Currency = {
      id: Number(id),
      name,
      symbol,
      code,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const updatedCurrency = await editCurrency(cur);
    if (!updatedCurrency) {
      res.status(500).json({ message: "Currency not updated" });
    }

    res.status(200).json(updatedCurrency);
    res.end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};

export const deleteCurrency = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const { id } = req.params;
  try {
    const removedCurrency = await removeCurrency(Number(id));
    res.status(200).json(removedCurrency);
    res.end();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
    res.end();
  }
};
