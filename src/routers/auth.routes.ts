import express from "express"
import { register, login } from "../controllers/auth/authentication";
const router = express.Router();
import { validateLogin, validateRegister } from "../validators/authentication.validators";

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);

export default router;
