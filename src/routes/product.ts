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
 * /v1/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
router.get('/products', (req: Request, res: Response) => {
  res.send('Get all products');
});

/**
 * @swagger
 * /v1/products:
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     responses:
 *       201:
 *         description: Created product
 */
router.post('/products', (req: Request, res: Response) => {
  res.send('Create a product');
});

/**
 * @swagger
 * /v1/products:
 *   patch:
 *     summary: Update a product
 *     tags: [Products]
 *     responses:
 *       202:
 *         description: Updated product
 */
router.patch('/products', (req: Request, res: Response) => {
  res.status(202).send('Updated a product');
});

export default router;

