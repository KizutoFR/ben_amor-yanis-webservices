import express from 'express';
import projectsController from '#src/controllers/projectsController'
import authGard from '#src/middleware/authGard'
const router = express.Router();

router.get('/',projectsController.allProjects);
router.get('/:id',projectsController.oneProject);
router.post('/',authGard.protect, projectsController.createProject);
router.put('/:id', authGard.protect,projectsController.updateProject);
router.patch('/:id', authGard.protect,projectsController.patchProject);
router.delete('/:id', authGard.protect,projectsController.deleteProject);

export default router;