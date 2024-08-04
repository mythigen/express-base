// const { default: swaggerJSDoc } = await import("swagger-jsdoc");
/* @ts-ignore */
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "An API application made with Express and documented with Swagger",
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

export const swaggerSpec = swaggerJSDoc(options);
// const swaggerUi = require('swagger-ui-express');

