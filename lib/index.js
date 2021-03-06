/**
 * Compile SCSS files
 * @module ascss
 */

'use strict'

const ascss = require('./ascss')

let lib = ascss.bind(this)

Object.assign(lib, ascss, {
  ascss
})

module.exports = lib
