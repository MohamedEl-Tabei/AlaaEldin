// require("dotenv").config()
// const mongoose= require("mongoose");
// const app=require("./app")


// mongoose.connect(process.env.MONGODBURI).then(()=>console.log("Database connected"))
// app.listen(process.env.PORT||5000,()=>{console.log(`App run`)})

require("dotenv").config()
const express = require("express");
const cors = require("cors");
const userRouter = require("./modules/user/user.route");
const locationRouter = require("./modules/location/location.route");
const reviewRouter = require("./modules/review/review.route");
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const { BASE_URL } = require("./shared/constants");
const errorMiddleware =require("./shared/middlewares/error.middleware")
const app = express();
const mongoose = require("mongoose");

(async ()=>{
    try{
        
await mongoose.connect(process.env.MONGODBURI, {
    serverSelectionTimeoutMS: 5000,
    family: 4, // Force IPv4
})
        console.log("Database connected")
    }catch(err) {
        console.error("MongoDB connection error:", err.message);
    };
    
})()
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

app.use(`${BASE_URL}/user`, userRouter);
app.use(`${BASE_URL}/location`, locationRouter);
app.use(`${BASE_URL}/review`, reviewRouter);

app.use(errorMiddleware);


// app.listen(process.env.PORT || 5000, () => {
//     console.log(`App running on port ${process.env.PORT || 5000}`)
// });
module.exports = app
