'use strict'

const fp = require('fastify-plugin')

const mercurius = require('mercurius')

const typeDefs = require('../graphql/schemas')
const resolvers = require('../graphql/resolvers')
const loaders = require('../graphql/loaders')

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
