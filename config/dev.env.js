'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //BASE_API: '"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"'
  //BASE_API: '"https://easy-mock.com/mock/5b762ccdf989ec12eb03db4d/example"'
  //BASE_API:'"https://easy-mock.com/mock/5beb77eaeae7b039c4b83032/rjz-erp"'
  BASE_API:'"http://localhost:8000"'
})
