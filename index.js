require('dotenv').config();
const restaurantRoutes = require('./src/routes/restaurant.routes');
const { initDatabase } = require('./src/utils/initMongoDB');
const { setupSwagger } = require('./src/utils/swagger');
const { subscribeToApiGateway } = require('./src/utils/registrySubscription');

const fastify = require("fastify")();
const PORT = process.env.PORT;
const HOST = process.env.HOST;

initDatabase();
setupSwagger(fastify);
subscribeToApiGateway();

fastify.register(restaurantRoutes, { prefix: "/api/restaurants" });

fastify.listen({ port: PORT, host: HOST }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server started : ${PORT}`);
})