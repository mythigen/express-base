import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/users', (req: Request, res: Response) => {
  res.send('Get all users');
});

/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: Created user
 */
router.post('/users', (req: Request, res: Response) => {
  res.send('Create a user');
});

/**
 * @swagger
 * /v1/users:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     responses:
 *       202:
 *         description: Deleted user
 */
router.delete('/users', (req: Request, res: Response) => {
  res.send('Delete a user');
});

export default router;
