import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const routesPath = path.join(__dirname, '.');
fs.readdirSync(routesPath).forEach((file) => {
  if (file !== 'index.ts' && file.endsWith('.ts')) {
    const filePath = path.parse(file).name
    const route = require(path.join(routesPath, file)).default;
    router.use(`/${filePath}`, route);
  }
});

export default router;

