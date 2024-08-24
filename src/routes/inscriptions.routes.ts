import { Router } from 'express';
import { getInscriptions, getInscription, createInscription } from '@controllers/inscriptions.controller';

const router = Router();

router.get('/', getInscriptions);
router.get('/:id', getInscription);
router.post('/', createInscription);
// router.put('/:id', updateVm);
// router.delete('/:id', deleteVm);

export default router;