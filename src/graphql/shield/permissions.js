'use strict'

const { shield, and, or, not } = require('graphql-shield')

const { isAdmin } = require('./rules')

const permissions = shield({
  Query: {
    cats: isAdmin,
    counters: isAdmin
  }
})

module.exports = { permissions }
