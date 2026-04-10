require("dotenv").config();
const express = require("express");
const cors = require("cors");
const userRouter = require("./modules/user/user.route");
const locationRouter = require("./modules/location/location.route");
const governorateRouter = require("./modules/governorate/governorate.route");
const neighborhoodRouter = require("./modules/neighborhood/neighborhood.route");
const reviewRouter = require("./modules/review/review.route");
const swaggerUi = require("swagger-ui-express");
const { BASE_URL } = require("./shared/constants");
const errorMiddleware = require("./shared/middlewares/error.middleware");
const app = express();
const mongoose = require("mongoose");
const swaggerSpec = require("./swagger");

(async () => {
  try {
    await mongoose.connect(process.env.MONGODBURI);
    console.log("Database connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
  }
})();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(`${BASE_URL}/user`, userRouter);
app.use(`${BASE_URL}/location`, locationRouter);
app.use(`${BASE_URL}/review`, reviewRouter);
app.use(`${BASE_URL}/governorate`, governorateRouter);
app.use(`${BASE_URL}/neighborhood`, neighborhoodRouter);

app.use(errorMiddleware);
app.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`App running on port ${process.env.PORT || 5000}`);
});
module.exports = app;
