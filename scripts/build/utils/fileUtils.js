import fs from 'fs';
import path from 'path';

export const clearTargetDir = (dir, outputDir) => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir);
  fs.mkdirSync(outputDir);
};

export const getRouteFiles = (routesDir) => {
  return fs.readdirSync(routesDir).filter(file => file.endsWith('.ts'));
};

