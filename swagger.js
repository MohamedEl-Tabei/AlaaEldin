const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AlaaEldin API",
      version: "1.0.0",
      description: "API documentation for AlaaEldin application",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
      {
        url: "https://alaa-eldin.vercel.app",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [],
  },
  apis: ["./modules/**/*.route.js", "./modules/**/*.controller.js"], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
module.exports = swaggerSpec;
