
const { getRestaurants, createRestaurant, deleteRestaurant, putRestaurant, getRestaurantsbyId, getRestaurantsByFuzzyMatch, patchRestaurant } = require("../views/restaurant.views");

const { schemaPutRestaurants, schemaPatchRestaurants, schemaDeleteRestaurants, schemaGetRestaurantsbyId, schemaGetRestaurants, schemaGetRestaurantsByFuzzyMatch, schemaCreateRestaurants } = require("../utils/swagger.schemas");

const restaurantRoutes = function (instance, opts, next) {
  instance.get('/', schemaGetRestaurants, getRestaurants);
  instance.post('/search', schemaGetRestaurantsByFuzzyMatch, getRestaurantsByFuzzyMatch);
  // positionner les :param à la fin du routing, car risque d'empêcher une route du genre de fonctionner
  // restaurantRoutes.get('/:truc', getRestaurantsbyId);
  instance.post('/', schemaCreateRestaurants, createRestaurant);
  instance.get('/:id', schemaGetRestaurantsbyId, getRestaurantsbyId);
  instance.delete('/:id', schemaDeleteRestaurants, deleteRestaurant);
  instance.put('/:id', schemaPutRestaurants, putRestaurant);
  instance.patch('/:id', schemaPatchRestaurants, patchRestaurant);
  next();
};

module.exports = restaurantRoutes;