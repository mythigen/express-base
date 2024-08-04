import path from 'path';
import { replacePatternsInFile } from '$build/utils';
import { prerenderPages } from '$build/prerender';
import { buildProject } from '$build/build';

const filePath = path.resolve('src/server.ts');
const outFilePath = path.resolve('src/server.temp.ts');

// Replace the patterns before running the tests
replacePatternsInFile(filePath, outFilePath);

// Prerender pages
prerenderPages();

// Build the project
buildProject(outFilePath,outFilePath);
