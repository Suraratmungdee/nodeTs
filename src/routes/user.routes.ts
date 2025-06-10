import express from 'express';
import { createUser, profile } from '../controllers/user.controller';
import { auth } from '../middleware/auth';

const router = express.Router();

router.post('/register', createUser);
router.get('/profile', auth, profile);

export default router;
