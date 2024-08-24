import { Router } from 'express';
import { getUsers, getUser, createUser } from '@controllers/users.controller';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
// router.put('/:id', updateVm);
// router.delete('/:id', deleteVm);

export default router;