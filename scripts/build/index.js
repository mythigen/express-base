import path from 'path';
import { replacePatternsInFile } from '$build/utils';
import { prerenderPages } from '$build/prerender';
import { buildProject } from '$build/build';

const filePath = path.resolve('src/server.ts');
const outFilePath = path.resolve('src/server.temp.ts');

replacePatternsInFile(filePath, outFilePath);

prerenderPages();

buildProject(outFilePath,outFilePath);
