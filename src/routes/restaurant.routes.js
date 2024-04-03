
const { getRestaurants, createRestaurant, deleteRestaurant, putRestaurant, getRestaurantsbyId, getRestaurantsByFuzzyMatch, patchRestaurant } = require("../views/restaurant.views");

const { apischematest } = require("../utils/schemas");

const restaurantRoutes = function (instance, opts, next) {
  instance.get('/', getRestaurants);
  instance.post('/search', getRestaurantsByFuzzyMatch);
  // positionner les :param à la fin du routing, car risque d'empêcher une route du genre de fonctionner
  // restaurantRoutes.get('/:truc', getRestaurantsbyId);
  instance.post('/', createRestaurant);
  instance.get('/:id', getRestaurantsbyId);
  instance.delete('/:id', deleteRestaurant);
  instance.put('/:id', putRestaurant);
  instance.patch('/:id', patchRestaurant);
  next();
};

module.exports = restaurantRoutes;