import express from "express";
import {
  getCurrencies,
  getCurrency,
  addCurrency,
  deleteCurrency,
  updateCurrency,
} from "../controllers/currencies.controller";
import { ensureAuthenticated } from "../middleware/ensure.authenticated";
import {
  validateAddCurrency,
  validateUpdateCurrency,
} from "../validators/currency.validators";
const router = express.Router();

/**
 * @swagger
 * /api/v1/currencies:
 *   get:
 *     summary: get all currencies
 *     tags: [Currencies]
 *     responses:
 *       200:
 *         description: The created currency.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/currency'
 *       500:
 *         description: Some server error
 */
router.get("/", getCurrencies);
router.get("/:id", ensureAuthenticated, getCurrency);
router.post("/add", validateAddCurrency, ensureAuthenticated, addCurrency);
router.patch(
  "/edit/:id",
  validateUpdateCurrency,
  ensureAuthenticated,
  updateCurrency,
);
router.delete("/delete/:id", ensureAuthenticated, deleteCurrency);

/**
 * @swagger
 * components:
 *   schemas:
 *     currency:
 *       type: object
 *       required:
 *         - name
 *         - symbol
 *         - code
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the currency
 *         symbol:
 *           type: string
 *           description: The symbol of the currency
 *         code:
 *           type: string
 *           description: The type of the currency
 *       example:
 *         name: US Dollar
 *         symbol: $
 *         code: USD
 * @swagger
 * tags:
 *   name: Currencies
 *   description: The currencies managing Endpoints
 */

export default router;
