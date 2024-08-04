import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import { compileTemplate, parseJsDocComments, extractPrerenderInfo } from '$build/utils/templateUtils';
import { clearTargetDir, getRouteFiles } from '$build/utils/fileUtils';

const viewsDir = path.resolve('views');
const outputDir = 'target/prerendered';
const routesDir = path.resolve('src');

export const prerenderPages = () => {
  const routeFiles = getRouteFiles(routesDir);
  const prerenderPages = routeFiles.flatMap(file => {
    const filePath = path.join(routesDir, file);
    const parsedComments = parseJsDocComments(filePath);
    return extractPrerenderInfo(parsedComments);
  });

  clearTargetDir('target', outputDir);

  prerenderPages.forEach(({ args }) => {
    const indexTemplatePath = path.join(viewsDir, 'web/home.hbs');
    const layoutTemplatePath = path.join(viewsDir, 'layouts/web/main.hbs');
    const layoutTemplateSource = fs.readFileSync(layoutTemplatePath, 'utf-8');
    const layoutTemplate = handlebars.compile(layoutTemplateSource);

    const prerenderedContent = layoutTemplate({
      title: 'Prerendered Page',
      body: compileTemplate(indexTemplatePath, args),
    });

    const outputFilePath = path.join(outputDir, 'http4xx.html');
    fs.writeFileSync(outputFilePath, prerenderedContent);
  });
};

