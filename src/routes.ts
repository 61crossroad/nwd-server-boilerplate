import express from 'express';

import {
  deleteUser,
  getUser,
  updateUser,
} from './apis/user';
import { login, signUp } from './apis/auth';

const router = express.Router();

// auth
router.post('/signup', signUp);
router.post('/login', login);

// user
router.get('/user', getUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

export default router;
