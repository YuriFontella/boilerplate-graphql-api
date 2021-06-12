'use strict'

const directiveResolvers = {
  isSuccess: (next, source, args, context) => {
    return next()
  },

  isError: (next, source, args, context) => {
    return new Error('Isso é um erro gerado na diretiva')
  }
}

module.exports = { directiveResolvers }