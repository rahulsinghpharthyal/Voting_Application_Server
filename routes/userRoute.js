import {Router} from 'express';
import { createUser, getAllVoter, loginUser, logoutUser } from '../controllers/userController.js';

const router = Router();

router.post('/create-user', createUser);
router.post('/login-user', loginUser);
router.post('/logout-user', logoutUser);
router.get('/all-voter', getAllVoter);

export default router;