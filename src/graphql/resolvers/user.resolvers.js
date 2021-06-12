'use strict'

module.exports = {
  Query: {
    users: async (parent, { args }, context, info) => {
      const users = await context.app.knex('users')

      await context.pubsub.publish({
        topic: 'NOTIFICATION',
        payload: {
          notification: { message: 'Uma nova notificação' }
        }
      })

      return users
    }
  },

  Mutation: {
    login: async (parent, { email, password }, context, info) => {

      const user = await context.app.knex('users').where({ email: email, status: true }).first()

      if (user) {

        const compare = context.app.bcrypt.compare(password, user.password)

        if (compare) {

          const token = await context.app.crypto.token()

          await context.app.knex('sessions')
            .insert({ user_id: user.id, access_token: context.app.crypto.hash(token) })

          return { user, token }
        }

      }

      return new Error('Usuário ou senha incorretos')

    }
  },

  Subscription: {
    notification: {
      subscribe: async (parent, args, { pubsub }) => {
        return await pubsub.subscribe('NOTIFICATION')
      }
    }
  }
}
