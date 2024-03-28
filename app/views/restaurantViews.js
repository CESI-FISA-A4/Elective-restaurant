const mongoose = require("mongoose");
const { Restaurant } = require("../models/Restaurant");
// import restaurantRoutes from "../routes/restaurantRoutes";
module.exports = {
  // get - FuzzyMatch
  getRestaurantsByFuzzyMatch: async (req, res) => {
    try {
      if (!name) return res.status(400).send('name Required !');
      const { name } = req.body;
      const restaurantList = [];
      return res.status(200).json(restaurantList);    
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  // get - FindbyID
  getRestaurantsbyId: async (req, res) => {
    try {
      console.log(req);
      const { id } = req.params;
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
      const { id, name, address, acceptTicket, description, imgUrl } = req.body;
      if (!id) return res.status(400).send('No id sent');

    } catch (error) {

    }
  },
  putRestaurant: async (req, res) => {
    try {
      const { id, name, address, acceptTicket, description, imgUrl } = req.body;
      if (!(id && name && address && acceptTicket && description)) return res.status(400).send('Not all required infos sent');
      await Restaurant.findByIdAndUpdate(id, { name, address, acceptTicket, description, imgUrl });
      return res.status(200).json({ response: 'Restaurant modified successfully' });
    } catch (error) {
      return res.status(500).json({ error: `Internal Server Error` });
    }
  }
  ,
  deleteRestaurant: async (req, res) => {
    try {
      const { id } = req.body;
      if (!id) return res.status(400).send('id Required !');
      await Restaurant.findByIdAndDelete(id)
      return res.status(200).json({ response: 'Restaurant deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: `Internal Server Error` });
    }
  },
  createRestaurant: async (req, res) => {
    try {
      const { name, address, acceptTicket, description, imgUrl } = req.body;
      if (!name || !address || !acceptTicket || !description) return res.status(400).send('Not all required infos sent');
      Restaurant.create({ name, address, acceptTicket, description, imgUrl })
      return res.status(200).json({ response: 'Restaurant created successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}