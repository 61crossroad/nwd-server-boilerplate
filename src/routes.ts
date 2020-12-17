import express from 'express';

import {
  deleteUser,
  getUsers,
  getUser,
  updateUser,
} from './apis/user';
import { signUp } from './apis/auth';

const router = express.Router();

router.post('/signup', signUp);
router.get('/user', getUsers);
router.get('/user/:userId', getUser);
router.put('/user/:userId', updateUser);
router.delete('/user/:userId', deleteUser);

export default router;
