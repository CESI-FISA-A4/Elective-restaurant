const axios = require("axios");
require('dotenv').config();

module.exports = {
    subscribeToApiGateway: async() => {
        try {
            const response = await axios({
                method: "POST",
                baseURL: `http://${process.env.GATEWAY_HOST}:${process.env.GATEWAY_PORT}`,
                url: `/registry/services`,
                data: {
                    "serviceLabel": "Service Restaurant",
                    "host": process.env.HOST,
                    "port": process.env.PORT,
                    "entrypointUrl": "/api/restaurants",
                    "redirectUrl": "/api/restaurants",
                    routeProtections: [
                        { methods: ["POST"], route: "/", roles: ["restaurantOwner", "admin"] },
                    ]
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}