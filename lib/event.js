"use strict";

var pDefaultPrevented = Symbol("default prevented"),
    pPropagationStopped = Symbol("propagation stopped"),
    pTarget, pEventPhase, pCurrentTarget;

class ObjectEvent {
    constructor(type, desc) {
        if(typeof(type) === "undefined" || typeof(type.toString) !== "function") {
            throw new TypeError("Failed to construct 'ObjectEvent': An event name must be provided.");
        }

        if(typeof(desc) === "undefined") {
            desc = {
                "cancelable": true,
                "propagates": true,
                "detail": null
            };
        }

        if(typeof(desc) !== "object") {
            throw new TypeError("ObjectEvent expects an object as argument 2");
        }

        Object.defineProperties(this, {
            "type": {
                "enumerable": true,
                "value": type.toString()
            },
            "detail": {
                "enumerable": true,
                "value": ("detail" in desc) ? desc.detail : null
            },
            "cancelable": {
                "enumerable": true,
                "value": !!desc.cancelable
            },
            "propagates": {
                "enumerable": true,
                "value": !!desc.propagates
            },
            "timeStamp": {
                "enumerable": true,
                "value": Date.now()
            }
        });

        this[pDefaultPrevented] = false;
        this[pPropagationStopped] = false;
    }

    get defaultPrevented() {
        return this[pDefaultPrevented];
    }

    preventDefault() {
        if(this.cancelable) {
            this[pDefaultPrevented] = true;
        }
    }

    get propagationStopped() {
        return this[pPropagationStopped];
    }

    stopPropagation() {
        if(this.propagates) {
            this[pPropagationStopped] = true;
        }
    }

    get currentTarget() {
        return this[pCurrentTarget];
    }

    get eventPhase() {
        return this[pEventPhase];
    }

    get target() {
        return this[pTarget];
    }
}

Object.defineProperties(ObjectEvent, {
    "PHASE_AT_TARGET": {
        "enumerable": true,
        "value": 1
    },
    "PHASE_SINKING": {
        "enumerable": true,
        "value": 2
    },
    "PHASE_RISING": {
        "enumerable": true,
        "value": 3
    }
});

export const initEvent = function(_pTarget, _pEventPhase, _pCurrentTarget) {
    pTarget = _pTarget;
    pEventPhase = _pEventPhase;
    pCurrentTarget = _pCurrentTarget;
};

export var Event = ObjectEvent;
