import express from 'express';

import {
  createUser,
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from './apis/user';

const router = express.Router();

router.post('/user', createUser);
router.get('/user', getUsers);
router.get('/user/:userId', getUser);
router.put('/user/:userId', updateUser);
router.delete('/user/:userId', deleteUser);

export default router;
