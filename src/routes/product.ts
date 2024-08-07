"use-bare"
import { Router, Request, Response } from 'express';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Product management
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/', (req: Request, res: Response) => {
  res.send('Get all products');
});

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Created product
 */
router.post('/', (req: Request, res: Response) => {
  res.send('Create a product');
});

/**
 * @swagger
 * /:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     responses:
 *       202:
 *         description: Updated product
 */
router.patch('/', (req: Request, res: Response) => {
  res.status(202).send('Updated a product');
});

export default router;

