const restaurantProperties = {
  name: { type: 'string' },
  address: { type: 'string' },
  acceptTicket: { type: "boolean" },
  decription: {type: "string"},
  imgUrl: {type: "string"}
}

module.exports = {
  schemaPutRestaurants: {
    schema: {
      description: 'Update the whole data of specified Restaurant',
      params: {
        type: 'object',
        required: ["id"],
        properties: {
          id: {
            type: 'string',
            description: 'Restaurant id'
          }
        }
      },
      body: {
        type: 'object',
        required: ["name","address","acceptTicket","decription","imgUrl"],
        properties: restaurantProperties
      }
    }
  },
  schemaPatchRestaurants: {
    schema: {
      description: 'Patch data of specified Restaurant',
      // tags: ['user', 'code'],
      // summary: 'qwerty',
      params: {
        type: 'object',
        required: ["id"],
        properties: {
          id: {
            type: 'string',
            description: 'Restaurant id'
          }
        }
      },
      body: {
        type: 'object',
        properties: restaurantProperties
      }
    }
  },
  schemaDeleteRestaurants: {
    schema: {
      description: 'Delete specified Restaurant',
      params: {
        type: 'object',
        required: ["id"],
        properties: {
          id: {
            type: 'string',
            description: 'Restaurant id'
          }
        }
      }
    }
  },
  schemaGetRestaurants: {
    schema: {
      description: 'Get all restaurants',
    }
  },
  schemaGetRestaurantsbyId: {
    schema: {
      description: 'Get specified Restaurant',
      params: {
        type: 'object',
        required: ["id"],
        properties: {
          id: {
            type: 'string',
            description: 'Restaurant id'
          }
        }
      }
    }
  },
  schemaCreateRestaurants: {
    schema: {
      description: 'Create a new Restaurant',
      body: {
        type: 'object',
        required: ["name","address","acceptTicket","decription","imgUrl"],
        properties: restaurantProperties
      }
    }
  },
  schemaGetRestaurantsByFuzzyMatch: {
    schema: {
      description: 'Get restaurants with similar name',
      body: {
        type: 'object',
        properties: {name: { type: 'string' }}
      }
    }
  },
}