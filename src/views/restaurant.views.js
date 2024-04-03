const { mongoose, isValidObjectId } = require("mongoose");
const levenshtein = require('js-levenshtein');
const { Restaurant } = require("../models/restaurant.model");

const errors = {
  invalidId: (() => {
    const err = Error("Invalid Id format");
    err.statusCode = 400;
    return err;
  })(),
  missingRequiredParams: (() => {
    const err = Error("Not all required parameters filled");
    err.statusCode = 400;
    return err;
  })(),
}

module.exports = {
  getRestaurantsByFuzzyMatch: async (req, res) => {
    console.log(req.body);
    const { name } = req.body;
    const restaurantList = await Restaurant.find();
    const macthingRestaurants = restaurantList.filter(restaurant => levenshtein(restaurant.name, name) <= 5);
    return macthingRestaurants.length ? macthingRestaurants : restaurantList;
  },
  getRestaurantsbyId: async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return errors.invalidId;
    
    const restaurant = await Restaurant.findById(id);
    return restaurant;
  },
  getRestaurants: async (req, res) => {
    const allRestaurants = await Restaurant.find();
    return allRestaurants;
  },
  patchRestaurant: async (req, res) => {
    const { id } = req.params;
    const { name, address, acceptTicket, description, imgUrl } = req.body;

    if (!isValidObjectId(id)) return errors.invalidId;
    if (!name && !address && !acceptTicket && !description && !imgUrl) return errors.missingRequiredParams;

    await Restaurant.findByIdAndUpdate(id, { name, address, acceptTicket, description, imgUrl })
    return 'Restaurant updated successfully';
  },
  putRestaurant: async (req, res) => {
    const { id } = req.params;
    const { name, address, acceptTicket, description, imgUrl } = req.body;

    if (!isValidObjectId(id)) return errors.invalidId;
    if (!id || !name || !address || !acceptTicket || !description) return errors.missingRequiredParams;

    await Restaurant.findByIdAndUpdate(id, { name, address, acceptTicket, description, imgUrl });
    return 'Restaurant updated successfully';
  }
  ,
  deleteRestaurant: async (req, res) => {
    const { id } = req.params;

    if (!isValidObjectId(id)) return errors.invalidId;
    
    await Restaurant.findByIdAndDelete(id)
    return 'Restaurant deleted successfully';
  },
  createRestaurant: async (req, res) => {
    const { name, address, acceptTicket, description, imgUrl } = req.body;

    if (!name || !address || !acceptTicket || !description) return errors.missingRequiredParams;

    Restaurant.create({ name, address, acceptTicket, description, imgUrl })
    return 'Restaurant created successfully';
  }
}