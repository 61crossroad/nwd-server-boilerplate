import express from 'express';

const router = express.Router();

router.use('/*', (req, res, next) => {
  console.log('Hello World Server!');
  res.send('Hello World Front!');
});

export default router;
