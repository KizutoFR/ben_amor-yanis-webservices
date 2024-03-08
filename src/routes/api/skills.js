import express from 'express';
import skillsController from '#src/controllers/skillsController'
import authGard from '#src/middleware/authGard'
import {cache} from '#src/middleware/cache'
const router = express.Router();

router.get('/',authGard.protect, cache, skillsController.allSkills);
router.get('/:id',authGard.protect, cache, skillsController.oneSkill);
router.post('/',authGard.protect, skillsController.createSkill);
router.patch('/:id', authGard.protect, authGard.isAdmin,skillsController.patchSkill);
router.delete('/:id', authGard.protect, authGard.isAdmin,skillsController.deleteSkill);

export default router;