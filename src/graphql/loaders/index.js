'use strict'

const { mergeResolvers } = require('@graphql-tools/merge')
const { loadFilesSync } = require('@graphql-tools/load-files')

const { join } = require('path')

const loaders = loadFilesSync(join(__dirname, '*.loaders.*'))

module.exports = mergeResolvers(loaders)
