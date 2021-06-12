'use strict'

const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

const { join } = require('path')

const resolvers = loadFilesSync(join(__dirname, '*.resolvers.*'))

module.exports = mergeResolvers(resolvers)
