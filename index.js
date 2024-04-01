require('dotenv').config();
const restaurantRoutes = require('./src/routes/restaurant.routes');
const { initDatabase } = require('./src/utils/initMongoDB');
const fastify = require("fastify")();
const PORT =process.env.PORT;
const HOST =process.env.HOST;

initDatabase();
// fastify.addContentTypeParser('application/json', { parseAs: 'string' },(req,body,done)=>{
//   try {
//     var json = JSON.parse(body)
//     done(null, json)
//   } catch (err) {
//     err.statusCode = 400
//     done(err, undefined)
//   }
// })
fastify.register(restaurantRoutes, {prefix: "/api/restaurants"});

// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
// app.use("/api/restaurants",restaurantRoutes)

// app.listen(
//   process.env.PORT,
//   process.env.HOST,
//   () => {
//       console.log(`Server started at ${process.env.HOST}:${process.env.PORT}`);
//   }
// )

fastify.listen({ port: PORT, host: HOST }, (err) => {
  if (err) {
      console.error(err);
      process.exit(1);
  }

  console.log(`Server started : ${PORT}`);
})