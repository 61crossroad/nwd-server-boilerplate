import express from 'express';

import { login, signUp } from './apis/auth';
import { deleteUser, getUser, updateUser } from './apis/user';

const router = express.Router();

// auth
router.post('/signup', signUp);
router.post('/login', login);

// user
router.get('/user', getUser);
router.put('/user', updateUser);
router.delete('/user', deleteUser);

export default router;
