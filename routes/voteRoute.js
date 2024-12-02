import {Router} from 'express';
import { createVote } from '../controllers/voteController.js';

const router = Router();

router.post('/create-vote/:userId/:candidateId', createVote);

export default router;