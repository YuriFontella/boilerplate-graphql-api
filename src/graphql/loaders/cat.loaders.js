'use strict'

module.exports = {

  Cat: {
    owner: async (queries, context) => {

      const users = queries.map(({ obj }) => obj.user_id)

      const response = await context.app.knex('cats')
        .select('users.name')
        .join('users', 'users.id', 'cats.user_id')
        .whereIn('cats.user_id', users)
        .orderBy('cats.id', 'asc')

      return response
    }
  }
}