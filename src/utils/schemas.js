module.exports = {
  apischematest: {
    schema: {
      description: 'post some data',
      tags: ['user', 'code'],
      summary: 'qwerty',
      params: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      },
      body: {
        type: 'json',
        properties: {
          id: {
            type: 'string',
            description: 'user id'
          }
        }
      }
    }
  }
}