import { Router } from 'express';
import { getInscriptions, getInscription, createInscription, updateInscription, deleteInscription } from '../controllers/inscriptions.controller';

const router = Router();

router.get('/', getInscriptions);
router.get('/:id', getInscription);
router.post('/', createInscription);
router.put('/:id', updateInscription);
router.delete('/:id', deleteInscription);

export default router;