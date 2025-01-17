import express from "express"
import { currentUser, getAllUsers } from "../controllers/user"
import { ensureAuthenticated } from "../middleware/ensure.authenticated";

const router = express.Router();

router.get('/', getAllUsers);
router.post('/current', ensureAuthenticated ,currentUser);


export default router;
