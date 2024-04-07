const axios = require("axios");

module.exports = {
    subscribeToApiGateway: async() => {
        try {
            const response = await axios({
                method: "POST",
                baseURL: `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}`,
                url: `/registry/services`,
                headers: { 'Content-Type': 'application/json' },
                data: {
                    serviceIdentifier: "restaurant-service",
                    serviceLabel: "Service Restaurant",
                    host: process.env.HOST,
                    port: process.env.PORT,
                    entrypointUrl: "/api/restaurants",
                    redirectUrl: "/api/restaurants",
                    routeProtections: [
                        { methods: ["POST"], route: "/", roles: ["restaurantOwner", "admin"] },
                        { methods: ["PUT","PATCH","DELETE"], route: "/:id", roles: ["restaurantOwner", "admin"]}
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}