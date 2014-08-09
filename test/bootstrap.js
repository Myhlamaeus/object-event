/* jshint node:true */

"use strict";

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

var traceur = require("traceur");

traceur.options.blockBinding = true;
traceur.require.makeDefault(function(filename) {
  // don't transpile our dependencies, just our app
  // console.log(filename);
  return filename.indexOf("node_modules") === -1;
});

module.exports = require("./test.js");
