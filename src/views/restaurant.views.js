const { mongoose } = require("mongoose");
const levenshtein = require('js-levenshtein');
const { Restaurant } = require("../models/restaurant.model");

module.exports = {
  getRestaurantsByFuzzyMatch: async (req, res) => {
      const { name } = req.body.name;
      const restaurantList = await Restaurant.find();
      if (!name) return restaurantList;
      const macthingRestaurants = restaurantList.filter(restaurant => levenshtein(restaurant.name, name) <= 5);
      return macthingRestaurants;
  },
  getRestaurantsbyId: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400) && 'id Required !';
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
    if (!name && !address && !acceptTicket && !description && !imgUrl) return res.status(400) && 'No info sent';
    await Restaurant.findByIdAndUpdate(id, { name, address, acceptTicket, description, imgUrl })
    return 'Restaurant updated successfully';
  },
  putRestaurant: async (req, res) => {
    const { id } = req.params;
    const { name, address, acceptTicket, description, imgUrl } = req.body;
    if (!(id && name && address && acceptTicket && description)) return res.status(400) && 'Not all required infos sent';
    await Restaurant.findByIdAndUpdate(id, { name, address, acceptTicket, description, imgUrl });
    return 'Restaurant updated successfully';
  }
  ,
  deleteRestaurant: async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).send('id Required !');
    await Restaurant.findByIdAndDelete(id)
    return 'Restaurant deleted successfully';
  },
  createRestaurant: async (req, res) => {
    const { name, address, acceptTicket, description, imgUrl } = req.body;
    if (!name || !address || !acceptTicket || !description) return res.status(400) && 'Not all required infos sent';
    Restaurant.create({ name, address, acceptTicket, description, imgUrl })
    return 'Restaurant created successfully';
  }
}