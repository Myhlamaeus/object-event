/* global describe, it */

import {Event, Target} from '../../object-event.js'
import {expect} from 'chai'

describe('Event, Target', function () {
  it('should work', function (done) {
    const target = new Target()
    const evt = new Event('test', {
      cancelable: false,
      propagates: false,
      detail: null
    })

    target.createPromise('test').then(function (e) {
      expect(e.type).to.equal(evt.type)
      done()
    })
    target.dispatchEvent(evt)
  })
})
