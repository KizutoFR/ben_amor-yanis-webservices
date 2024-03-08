import express from 'express';
import projectsController from '#src/controllers/projectsController'
import authGard from '#src/middleware/authGard'
import {cache} from '#src/middleware/cache'
const router = express.Router();

router.get('/', cache, projectsController.allProjects);
router.get('/:id', cache, projectsController.oneProject);
router.post('/',authGard.protect, projectsController.createProject);
router.put('/:id', authGard.protect, authGard.isAdmin,projectsController.updateProject);
router.patch('/:id', authGard.protect, authGard.isAdmin,projectsController.patchProject);
router.delete('/:id', authGard.protect, authGard.isAdmin,projectsController.deleteProject);

export default router;