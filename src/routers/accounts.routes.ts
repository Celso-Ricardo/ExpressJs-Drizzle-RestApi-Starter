/**
 * @swagger
 * components:
 *   schemas:
 *     accounts:
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
 *   name: Accounts
 *   description: The accounts managing Endpoints
 */
