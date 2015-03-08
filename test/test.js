/* jshint node:true */

"use strict";

import {Event, Target} from "../object-event.js";

module.exports = {
    test: {
        test: function(test) {
            var target = new Target(),
                evt = new Event("test", {
                    "cancelable": false,
                    "propagates": false,
                    "detail": null
                });
            target.createPromise("test").then(function(e) {
                test.equal(e.type, evt.type);
                // console.log(e);
                test.done();
            });
            target.dispatchEvent(evt);
        }
    }
};
