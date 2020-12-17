import { PrismaClient } from '@prisma/client';

import { encryptCredential } from '../utils/auth';

const prisma = new PrismaClient();

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
