const express = require("express");
const {getRestaurants,createRestaurant,deleteRestaurant, putRestaurant, getRestaurantsbyId, getRestaurantsByFuzzyMatch} = require("../views/restaurantViews");

const restaurantRoutes = express.Router();

restaurantRoutes.get('/', getRestaurants);
restaurantRoutes.get('/search',getRestaurantsByFuzzyMatch);
// positionner les :param à la fin du routing, car risque d'empêcher une route du genre de fonctionner
// restaurantRoutes.get('/:truc', getRestaurantsbyId);
restaurantRoutes.get('/:id', getRestaurantsbyId);
restaurantRoutes.post('/', createRestaurant);
restaurantRoutes.delete('/', deleteRestaurant);
restaurantRoutes.put('/', putRestaurant);

module.exports = restaurantRoutes;