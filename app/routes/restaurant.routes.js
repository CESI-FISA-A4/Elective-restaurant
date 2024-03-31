const express = require("express");
const { getRestaurants, createRestaurant, deleteRestaurant, putRestaurant, getRestaurantsbyId, getRestaurantsByFuzzyMatch, patchRestaurant } = require("../views/restaurant.views");

const restaurantRoutes = express.Router();

restaurantRoutes.get('/', getRestaurants);
restaurantRoutes.get('/search', getRestaurantsByFuzzyMatch);
// positionner les :param à la fin du routing, car risque d'empêcher une route du genre de fonctionner
// restaurantRoutes.get('/:truc', getRestaurantsbyId);
restaurantRoutes.post('/', createRestaurant);
restaurantRoutes.get('/:id', getRestaurantsbyId);
restaurantRoutes.delete('/:id', deleteRestaurant);
restaurantRoutes.put('/:id', putRestaurant);
restaurantRoutes.patch('/:id', patchRestaurant);

module.exports = restaurantRoutes;