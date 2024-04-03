const { mongoose } = require("mongoose");
const levenshtein = require('js-levenshtein');
const sanitize  = require("mongo-sanitize");
const { Restaurant } = require("../models/restaurant.model");

module.exports = {
  getRestaurantsByFuzzyMatch: async (req, res) => {
    try {
      const { name } = sanitize(req.body);
      if (!name) return res.status(400).send('name Required !');
      const restaurantList = await Restaurant.find();
      const macthingRestaurants = restaurantList.filter(restaurant => levenshtein(restaurant.name, name) <= 5);
      return res.status(200).json(macthingRestaurants);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getRestaurantsbyId: async (req, res) => {
    try {
      const { id } = sanitize(req.params);
      if (!id) return res.status(400).send('id Required !');
      const restaurant = await Restaurant.findById(id);
      return res.status(200).json(restaurant);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  getRestaurants: async (req, res) => {
    try {
      const allRestaurants = await Restaurant.find();
      return res.status(200).json(allRestaurants);
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  patchRestaurant: async (req, res) => {
    try {
      const { id } = sanitize(req.params);
      const { name, address, acceptTicket, description, imgUrl } = sanitize(req.body);
      if (!name && !address && !acceptTicket && !description && !imgUrl)  return res.status(400).send('No info sent');
      await Restaurant.findByIdAndUpdate(id,{ name, address, acceptTicket, description, imgUrl})
      return res.status(200).json({ response: 'Restaurant updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: `Internal Server Error` });
    }
  },
  putRestaurant: async (req, res) => {
    try {
      const { id } = sanitize(req.params)
      const { name, address, acceptTicket, description, imgUrl } = sanitize(req.body);
      if (!(id && name && address && acceptTicket && description)) return res.status(400).send('Not all required infos sent');
      await Restaurant.findByIdAndUpdate(id, { name, address, acceptTicket, description, imgUrl });
      return res.status(200).json({ response: 'Restaurant updated successfully' });
    } catch (error) {
      return res.status(500).json({ error: `Internal Server Error` });
    }
  }
  ,
  deleteRestaurant: async (req, res) => {
    try {
      const { id } = sanitize(req.params)
      if (!id) return res.status(400).send('id Required !');
      await Restaurant.findByIdAndDelete(id)
      return res.status(200).json({ response: 'Restaurant deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: `Internal Server Error` });
    }
  },
  createRestaurant: async (req, res) => {
    try {
      const { name, address, acceptTicket, description, imgUrl } = sanitize(req.body);
      if (!name || !address || !acceptTicket || !description) return res.status(400).send('Not all required infos sent');
      Restaurant.create({ name, address, acceptTicket, description, imgUrl })
      return res.status(200).json({ response: 'Restaurant created successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}