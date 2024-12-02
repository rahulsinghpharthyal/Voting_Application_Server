import { Router } from 'express';
import { addCandiateSymbol, createCandidate, deleteCandidate, getCandidates, updateCandidate } from '../controllers/candidateController.js';
import { upload } from '../middleware/multerConfilg.js';

const router = Router();
 
router.post('/symbol-upload', upload, addCandiateSymbol)
router.post('/create-candidate', createCandidate);
router.patch('/update-candidate/:candidateId', updateCandidate);
router.get('/get-candidate', getCandidates);
router.delete('/delete-candidate/:candidateId', deleteCandidate);

export default router;