/**
 * Compile SCSS files
 * @module ascss
 */

'use strict'

let d = (module) => module.default || module

module.exports = {
  get ascss () { return d(require('./ascss')) }
}
