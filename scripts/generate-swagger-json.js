// scripts/generate-swagger-json.ts
import swaggerJsdoc from 'swagger-jsdoc';
import fs from 'fs';
import path from 'path';

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API with Swagger',
    version: '1.0.0',
    description: 'A simple CRUD API application made with Express and documented with Swagger',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Development server',
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ['./src/routes/*.ts', './src/server.ts'],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

// Save swagger.json to a file
const saveSwaggerJson = () => {
  const swaggerJsonPath = path.resolve(__dirname, '../static/v1/swagger.json');
  fs.writeFileSync(swaggerJsonPath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');
  console.log(`Swagger JSON saved to ${swaggerJsonPath}`);
};

saveSwaggerJson();
