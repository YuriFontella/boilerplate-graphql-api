'use strict'

module.exports = {
  Query: {
    cats: async (parent, { args }, context) => {
      return await context.app.knex('cats').orderBy('cats.id', 'asc')
    }
  }
}
