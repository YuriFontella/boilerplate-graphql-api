'use strict'

const fp = require('fastify-plugin')

const mercurius = require('mercurius')

const { resolve } = require('path')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge')

const filesTypeDefs = loadFilesSync(resolve('src/graphql/schemas'), { extensions: ['graphql'] })
const typeDefs = mergeTypeDefs(filesTypeDefs)

const filesResolvers = loadFilesSync(resolve('src/graphql/resolvers', '*.resolvers.*'))
const resolvers = mergeResolvers(filesResolvers)

const filesLoaders = loadFilesSync(resolve('src/graphql/loaders', '*.loaders.*'))
const loaders = mergeResolvers(filesLoaders)

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
