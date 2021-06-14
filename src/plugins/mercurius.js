'use strict'

const fp = require('fastify-plugin')

const mercurius = require('mercurius')

const { typeDefs, resolvers, loaders } = require('../graphql/tools')

const { permissions } = require('../graphql/shield/permissions')

const { directiveResolvers } = require('../graphql/directives')

const { applyMiddleware } = require('graphql-middleware')

const { makeExecutableSchema } = require('@graphql-tools/schema')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  directiveResolvers
})

const schemaWithMiddleware = applyMiddleware(schema, permissions)

module.exports = fp(async (app) => {
  app.register(mercurius, {
    schema: schemaWithMiddleware,
    loaders: loaders,
    subscription: true,
    graphiql: 'playground'
  })
})
