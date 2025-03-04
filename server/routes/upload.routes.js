import { Router } from 'express'
import auth from '../middleware/auth.js';
import uploadImageControllers from '../controllers/uploadImage.controllers.js';
import upload from '../middleware/multer.js';
const router = Router();

router.post("/upload",auth,upload.single("image"),uploadImageControllers)

export default router;