import swaggerJSDoc from "swagger-jsdoc";

const swaggerSpecs = swaggerJSDoc({
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:4052",
      },
    ],
  },
  apis: [
    `${__dirname}/routers/*.ts`,
    `${__dirname}/routers/*.ts`,
    `${__dirname}/swagger.js`,
    `${__dirname}/swagger.js`,
  ],
});

export default swaggerSpecs;
