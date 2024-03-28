require('dotenv').config();
const express = require('express');
const restaurantRoutes = require('./app/routes/restaurantRoutes');
const { initDatabase } = require('./app/utils/initMongoDB');
const bodyParser = require('body-parser');

const app = express();

console.log("before initDatabase");
initDatabase();
console.log("after initDatabase");

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use("/api/restaurants",restaurantRoutes)

app.listen(
  process.env.PORT,
  process.env.HOST,
  () => {
      console.log(`Server started at ${process.env.HOST}:${process.env.PORT}`);
  }
)