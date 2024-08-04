const fs = require('fs');
const path = require('path');

const filePath = path.resolve(__dirname, './src/server.ts');

const replacements = [
  {
    regex: /const\s*{\s*default:\s*(\w+)\s*}\s*=\s*await\s*import\(['"]([^'"]+)['"]\);/g,
    replacement: (match, p1, p2) => `import ${p1} from '${p2}';`
  },
  {
    regex: /const\s*{\s*([^}]+)\s*}\s*=\s*await\s*import\(['"]([^'"]+)['"]\);/g,
    replacement: (match, p1, p2) => `import { ${p1} } from '${p2}';`
  }
];

const replacePatternsInFile = (filePath, replacements) => {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(({ regex, replacement }) => {
    fileContent = fileContent.replace(regex, replacement);
  });

  fs.writeFileSync(filePath, fileContent, 'utf8');
};

// Replace the patterns before running the tests
replacePatternsInFile(filePath, replacements);

