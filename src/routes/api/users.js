import express from 'express';
import usersController from '#src/controllers/usersController'
import authGard from '#src/middleware/authGard'
import {cache} from '#src/middleware/cache'

const router = express.Router();

router.get('/', authGard.protect, cache, usersController.allUsers);

router.get('/:identifier', authGard.protect, cache, usersController.oneUser);

router.post('/',usersController.createUser);

router.patch('/:identifier', authGard.protect, authGard.isAdmin, usersController.updateUser);

router.delete('/:identifier', authGard.protect, authGard.isAdmin, usersController.deleteUser);

export default router;