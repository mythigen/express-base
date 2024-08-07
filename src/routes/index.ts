import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

const routesPath = path.join(__dirname, '.');
fs.readdirSync(routesPath).forEach((file) => {
  if (file !== 'index.ts' && file.endsWith('.ts')) {
    const filePath = path.join(routesPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const firstLine = fileContent.split('\n')[0].trim();
    const useBareRegex = /^['"]use-bare['"];?$/;

    const route = require(filePath).default;

    if (useBareRegex.test(firstLine)) {
      router.use('/', route);
    } else {
      const routeName = path.parse(file).name;
      router.use(`/${routeName}`, route);
    }
  }
});

export default router;
