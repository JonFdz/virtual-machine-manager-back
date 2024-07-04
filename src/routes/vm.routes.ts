import { Router } from 'express';
import { getVms, getVm, createVm, updateVm, deleteVm } from '@controllers/vm.controller';

const router = Router();

router.get('/', getVms);
router.get('/:id', getVm);
router.post('/', createVm);
router.put('/:id', updateVm);
router.delete('/:id', deleteVm);

export default router;
