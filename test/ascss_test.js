/**
 * Test case for ascss.
 * Runs with mocha.
 */
'use strict'

const ascss = require('../lib/ascss.js')
const assert = require('assert')
const co = require('co')

describe('ascss', function () {
  this.timeout(8000)

  before(() => co(function * () {

  }))

  after(() => co(function * () {

  }))

  it('Ascss', () => co(function * () {
    yield ascss(
      `${__dirname}/../misc/mocks/mock-main.scss`,
      `${__dirname}/../tmp/foo/testing-css/testing-compiled.css`,
      {}
    )
  }))
})

/* global describe, before, after, it */
