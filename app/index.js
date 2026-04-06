const express = require("express");
const cors = require("cors");
const userRouter = require("../modules/user/user.route");
const locationRouter = require("../modules/location/location.route");
const constants = require("../shared/constants");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'AlaaEldin API',
            version: '1.0.0',
            description: 'API documentation for AlaaEldin application',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./modules/**/*.route.js', './modules/**/*.controller.js'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`${constants.baseURL}/user`, userRouter);
app.use(`${constants.baseURL}/location`, locationRouter);

module.exports = app;