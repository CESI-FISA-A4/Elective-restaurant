const express = require("express");
const {getRestaurants} = require("../views/restaurantViews");

const restaurantRoutes = express.Router();

restaurantRoutes.get('/routes', getRestaurants)