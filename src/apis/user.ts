import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  const users = await prisma.user.findMany();

  return res.status(200).send({
    users,
  });
};

export const getUser = async (req, res) => {
  const { userId } = req.params;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  return res.status(200).send({
    user,
  });
};

export const createUser = async (req, res) => {
  const { email, name } = req.body.data;

  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return res.status(200).send({
    user,
  });
};

export const updateUser = async (req, res) => {
  const { userId } = req.params;
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
  const { userId } = req.params;

  const user = await prisma.user.delete({
    where: {
      id: userId,
    },
  });

  return res.status(200).send({
    user,
  });
};
