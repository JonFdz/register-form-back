import { Router } from 'express';
import { getActivities, getActivity, createActivity } from '@controllers/activities.controller';

const router = Router();

router.get('/', getActivities);
router.get('/:id', getActivity);
router.post('/', createActivity);
// router.put('/:id', updateVm);
// router.delete('/:id', deleteVm);

export default router;