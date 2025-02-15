import express from "express"
import { currentUser, getUsers } from "../controllers/user.controller"
import { ensureAuthenticated } from "../middleware/ensure.authenticated";

const router = express.Router();

router.get('/', ensureAuthenticated, getUsers);
router.post('/current', ensureAuthenticated ,currentUser);

export default router;
