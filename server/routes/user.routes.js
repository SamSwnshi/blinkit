import { Router } from 'express';
import { register ,login, logout, uploadAvatar} from '../controllers/user.controllers.js';
import auth from "../middleware/auth.js"
import upload from '../middleware/multer.js';

const router = Router()

router.post('/register',register)
router.post('/login',login)
router.get('/logout',auth,logout)
router.put('/upload-avatar',auth,upload.single("avatar"),uploadAvatar)

export default router;