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
 * /:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', (req: Request, res: Response) => {
  res.send('Get all users');
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a user
 *     tags: [Users]
 *     responses:
 *       201:
 *         description: Created user
 */
router.post('/', (req: Request, res: Response) => {
  res.send('Create a user');
});

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     responses:
 *       202:
 *         description: Deleted user
 */
router.delete('/', (req: Request, res: Response) => {
  res.send('Delete a user');
});

export default router;
