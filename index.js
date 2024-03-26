require('dotenv').config();
const express = require('express');
const authRoutes = require('./app/routes/restaurantRoutes');

const app = express();
app.use(express.json());