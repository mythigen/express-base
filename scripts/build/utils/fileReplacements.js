import fs from 'fs';
import path from 'path';

const exceptions = [
  'net',
  'path',
  'fs',
  'express',
  'cors',
  'morgan',
  '@utils/isPortInUse',
  '@middlewares/cors',
  '@middlewares/logger',
  '@routes'
];

const replacements = [
  {
    regex: /import\s+(\w+)\s+from\s+['"]([^'"]+)['"];/g,
    replacement: (match, p1, p2) => {
      if (exceptions.includes(p2)) {
        console.log(`Skipping replacement for ${p2}`);
        return match;
      }
      console.log(`Replacing default import of ${p1} from ${p2}`);
      return `const { default: ${p1} } = await import('${p2}');`;
    }
  },
  {
    regex: /import\s+{\s*([^}]+)\s*}\s+from\s+['"]([^'"]+)['"];/g,
    replacement: (match, p1, p2) => {
      if (exceptions.includes(p2)) {
        console.log(`Skipping replacement for ${p2}`);
        return match;
      }
      console.log(`Replacing named imports { ${p1} } from ${p2}`);
      return `const { ${p1.trim().split(',').map(name => name.trim()).join(', ')} } = await import('${p2}');`;
    }
  }
];

export const replacePatternsInFile = (filePath, outFilePath) => {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(({ regex, replacement }) => {
    fileContent = fileContent.replace(regex, replacement);
  });

  fs.writeFileSync(outFilePath, fileContent, 'utf8');
};

