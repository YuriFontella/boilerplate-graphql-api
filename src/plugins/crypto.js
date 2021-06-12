'use script'

const fp = require('fastify-plugin')

const crypto = require('crypto')

module.exports = fp(async (app) => {
  app.decorate('crypto', {
    token: () => {
      return new Promise((resolve) => {
        crypto.randomBytes(32, (error, data) => {
          resolve(data.toString('base64'))
        })
      })
    },

    hash: (token) => {
      return crypto.createHash('sha256').update(token).digest('base64')
    }
  })
})
