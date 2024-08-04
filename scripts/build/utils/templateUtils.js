import fs from 'fs';
import handlebars from 'handlebars';
import doctrine from 'doctrine';

export const compileTemplate = (templatePath, data) => {
  const templateSource = fs.readFileSync(templatePath, 'utf-8');
  const template = handlebars.compile(templateSource);
  return template(data);
};

export const parseJsDocComments = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const comments = content.match(/\/\*\*([\s\S]*?)\*\//g) || [];
  return comments.map(comment => doctrine.parse(comment, { unwrap: true }));
};

export const extractPrerenderInfo = (parsedComments) => {
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

