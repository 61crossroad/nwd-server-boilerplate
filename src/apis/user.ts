import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUser = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).send({
      error: 'notLoggedIn',
      message: 'This user is not logged in!',
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return res.status(200).send({
    user,
  });
};

export const updateUser = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).send({
      error: 'notLoggedIn',
      message: 'This user is not logged in!',
    });
  }

  const { email, name } = req.body.data;

  const user = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      email,
      name,
    },
  });

  return res.status(200).send({
    user,
  });
};

export const deleteUser = async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(400).send({
      error: 'notLoggedIn',
      message: 'This user is not logged in!',
    });
  }

  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return res.status(200).send({
    user,
  });
};
