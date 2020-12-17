import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';

import {
  encryptCredential,
  validateCredential,
  verifyAccessToken,
} from '../utils/auth';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

export const signUp = async (req, res) => {
  const { email, password, ...formData } = req.body.data;

  const userWithEmail = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (userWithEmail) {
    return res.status(400).send({
      error: 'takenEmail',
      message: 'Email is already taken',
    });
  }

  let createdUser;
  const hashedPassword = await encryptCredential(password);
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7);
  }

  try {
    createdUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ip,
        userAgent: req.headers['user-agent'],
        lastSignedIn: new Date().toISOString(),
        ...formData,
      },
    });
  } catch (err) {
    return res.status(500).send({
      error: 'InternalServerError',
      message: 'The error occurred during the sign up process',
    });
  }

  return res.status(200).send({
    user: createdUser,
  });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await prisma.user.findFirst({
    where: {
      email,
      deletedAt: null,
    },
  });

  if (!user) {
    return res.status(400).send({
      error: 'wrongEmailOrPassword',
      message: 'Email or Password Incorrect',
    });
  }

  const isPasswordValid = await validateCredential(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).send({
      error: 'wrongEmailOrPassword',
      message: 'Email or Password Incorrect',
    });
  }

  // if (!user.verified) {
  //   return res.status(400).send({
  //     error: 'notVerified',
  //     message: 'User is not verified',
  //   });
  // }

  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (ip.substr(0, 7) === '::ffff:') {
    ip = ip.substr(7);
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      lastSignedIn: new Date().toISOString(),
      ip: ip || user.ip,
      userAgent: req.headers['user-agent'] || user.userAgent,
    },
  });

  const token = sign({ id: user.id }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('accessToken', token, {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true,
    signed: true, // 'signed' option needs secret key which is given in 'cookieParser' middleware
  });
  res.status(200).send({
    auth: true,
    token: token,
    message: 'User found & Logged in',
  });
};

export const authenticateJWT = async (req, res, next) => {
  const validated: any = await verifyAccessToken(req);

  if (!validated?.id) return next(); // accessToken is incorrect

  const user = await prisma.user.findFirst({
    where: {
      id: validated.id,
    },
    select: {
      id: true,
      email: true,
      name: true,
      ip: true,
      userAgent: true,
      verified: true,
      lastSignedIn: true,
      createdAt: true,
      updatedAt: true,
      deletedAt: true,
    },
  });

  if (user) {
    req.user = user;
  }
  next();
};
