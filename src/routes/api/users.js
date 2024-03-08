import express from 'express';
import usersController from '#src/controllers/usersController'
import authGard from '#src/middleware/authGard'
const router = express.Router();

router.get('/', authGard.protect, usersController.allUsers);

router.get('/:identifier', authGard.protect, usersController.oneUser);

router.post('/',usersController.createUser);

router.patch('/:identifier', authGard.protect, usersController.updateUser);

router.delete('/:identifier', authGard.protect, usersController.deleteUser);

export default router;