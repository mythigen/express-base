import swaggerJSDoc, { OAS3Options } from "swagger-jsdoc";
import { SwaggerSpec } from "@interfaces/swagger"
import fs from "fs";
import path from "path";

const options: OAS3Options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description: "An API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Express Base",
        url: "https://express.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["**/routes/*.ts", "./src/server.ts"],
};

const swaggerSpec: SwaggerSpec = swaggerJSDoc(options) as SwaggerSpec;

const updatePathsWithBasePath = (spec: SwaggerSpec, basePath: string): { [key: string]: any } => {
  const updatedPaths: { [key: string]: any } = {};
  Object.keys(spec.paths).forEach((path) => {
    const newPath = `${basePath}${path === '/' ? '' : path}`;
    updatedPaths[newPath] = spec.paths[path];
  });
  return updatedPaths;
};

const routeFiles = fs.readdirSync(path.join(__dirname, '../routes'));
const finalPaths: { [key: string]: any } = {};
routeFiles.forEach((file) => {
  const basePath = `/v1/${path.basename(file, path.extname(file))}`;
  const filePath = `${path.join(__dirname, '../routes')}/${file}`;
  const tempSpec: SwaggerSpec = swaggerJSDoc({
    ...options,
    apis: [filePath],
  }) as SwaggerSpec;

  const updatedPaths = updatePathsWithBasePath(tempSpec, basePath);

  Object.assign(finalPaths, updatedPaths);
});

swaggerSpec.paths = finalPaths;

export { swaggerSpec };

