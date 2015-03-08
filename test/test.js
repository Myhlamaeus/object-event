/* jshint node:true */

import {Event, Target} from "../object-event.js";

export default {
    test: {
        test: function(test) {
            const target = new Target(),
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
