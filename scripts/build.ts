import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import esbuild from 'esbuild';
import doctrine from 'doctrine';

/* FILE REPLACEMENTS */
const filePath = path.resolve('src/server.ts');
const outFilePath = path.resolve('src/server.temp.ts');

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

const replacePatternsInFile = (filePath, replacements) => {
  let fileContent = fs.readFileSync(filePath, 'utf8');

  replacements.forEach(({ regex, replacement }) => {
    fileContent = fileContent.replace(regex, replacement);
  });

  fs.writeFileSync(outFilePath, fileContent, 'utf8');
};

// Replace the patterns before running the tests
replacePatternsInFile(filePath, replacements);
/* END OF FILE REPLACEMENTS */

const targetDir = 'target';

const viewsDir = path.join(__dirname, '../views');
const outputDir = 'target/prerendered';
// const outputDir = path.join(__dirname, '../static');
const routesDir = path.join(__dirname, '../src');

// Function to delete the target directory
function clearTargetDir(dir: string) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
  fs.mkdirSync(dir);
  fs.mkdirSync(outputDir);
}

const compileTemplate = (templatePath, data) => {
    const templateSource = fs.readFileSync(templatePath, 'utf-8');
    const template = handlebars.compile(templateSource);
    return template(data);
};

const parseJsDocComments = (filePath) => {
    const content = fs.readFileSync(filePath, 'utf-8');
    const comments = content.match(/\/\*\*([\s\S]*?)\*\//g) || [];
    return comments.map(comment => doctrine.parse(comment, { unwrap: true }));
};

const extractPrerenderInfo = (parsedComments) => {
    const prerenderInfo = [];
    parsedComments.forEach(comment => {
        const isPrerender = comment.tags.some(tag => tag.title === 'prerender');
        if (isPrerender) {
            const argsTag = comment.tags.find(tag => tag.title === 'args');
            const args = argsTag ? JSON.parse(argsTag.description) : {};
            prerenderInfo.push({ args });
        }
    });
    return prerenderInfo;
};

const routeFiles = fs.readdirSync(routesDir).filter(file => file.endsWith('.ts'));
const prerenderPages = routeFiles.flatMap(file => {
    const filePath = path.join(routesDir, file);
    const parsedComments = parseJsDocComments(filePath);
    return extractPrerenderInfo(parsedComments);
});

// Clear the target directory before building
clearTargetDir(targetDir);

// Prerender pages
prerenderPages.forEach(({ args }) => {
    const indexTemplatePath = path.join(viewsDir, 'web/home.hbs');
    const layoutTemplatePath = path.join(viewsDir, 'layouts/web/main.hbs');
    const layoutTemplateSource = fs.readFileSync(layoutTemplatePath, 'utf-8');
    const layoutTemplate = handlebars.compile(layoutTemplateSource);

    const prerenderedContent = layoutTemplate({
        title: 'Prerendered Page',
        body: compileTemplate(indexTemplatePath, args),
    });

    // Write the prerendered HTML to the output directory
    fs.writeFileSync(path.join(outputDir, 'http4xx.html'), prerenderedContent);
    
    const outputFilePath = path.join(outputDir, 'http4xx.html');
    fs.writeFileSync(outputFilePath, prerenderedContent);
});

esbuild.build({
  entryPoints: ['src/server.temp.ts'],
  bundle: true,
  minify: true,
  splitting: true,
  format: 'esm',
  outdir: 'target',
  platform: 'node',
  chunkNames: 'chunks/[name]-[hash]', // Customize chunk names
  entryNames: '[dir]/[name]', // Customize entry names
  logLevel: 'debug' // Set esbuild to be verbose
}).then(() => {
  console.log("Cleaning up...");
  fs.unlinkSync(outFilePath);
  console.log("Done!");
  
}).catch(() => process.exit(1));
