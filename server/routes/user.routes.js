import { Router } from 'express';
import { register ,login, logout} from '../controllers/user.controllers.js';
import auth from "../middleware/auth.js"

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',auth,logout)

export default router;