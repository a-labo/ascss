/**
 * Compile scss files
 * @function ascss
 * @param {string} src - Source file name
 * @param {string} dest - Destination file name
 * @param {Object} [options] - Optional settings
 * @param {string} [options.status] - Status file path
 * @param {string[]} [options.reflects] - File patterns to reflects changes
 * @returns {Promise}
 */
'use strict'

const co = require('co')
const aglob = require('aglob')
const path = require('path')
const execcli = require('execcli')
const { fileHash } = require('akv')
const akvStatus = require('akv-status')
const { mkdirpAsync } = require('asfs')

const relative = (filename) => path.relative(process.cwd(), filename)
const sass = (...cmdArgs) => execcli('node-sass', cmdArgs, {
  notfound: 'try `npm install node-sass -g`'
})

/** @lends function ascss */
function ascss (src, dest, options = {}) {
  src = relative(path.resolve(src))
  dest = relative(path.resolve(dest))

  let {
    status: statusFile = 'tmp/ascss.status.json',
    reflects = []
  } = options
  let store = akvStatus(statusFile)

  return co(function * () {
    reflects = yield aglob(reflects)

    if (reflects.length > 0) {
      let changed = yield store.filterStatusUnknown([ src, dest, ...reflects ])
      if (changed.length === 0) {
        return
      }
    }
    yield mkdirpAsync(path.dirname(dest))

    let from = yield fileHash(dest)
    yield sass(src, dest, {
      scss: true,
      sourceMap: `${dest}.map`,
      sourceMapContents: true
    })

    let to = yield fileHash(dest)
    let changed = from !== to
    if (changed) {
      console.log(`File generated: ${dest}`)
    }
  }).catch((err) => co(function * () {
    yield store.destroy()
    throw err
  }))
}

module.exports = ascss
