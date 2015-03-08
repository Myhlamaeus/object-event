let ObjectEventTarget,
    pTarget, pEventPhase, pCurrentTarget;

const pDispatchEvent = Symbol("dispatch event"),
    propagate = function(obj, e) {
        for(let key of Object.keys(obj)) {
            const val = obj[key];

            if(typeof(val) === "object") {
                if(val instanceof ObjectEventTarget || Object.getPrototypeOf(val) instanceof ObjectEventTarget) {
                    obj[pDispatchEvent](e);

                    if(e.propagationStopped) {
                        break;
                    }
                }

                propagate(val, e);

                if(e.propagationStopped) {
                    break;
                }
            }
        }
    },
    pListeners = Symbol("listeners");

import {Event as ObjectEvent} from "./event";

ObjectEventTarget = class {
    constructor() {
        this[pListeners] = {};
    }

    addEventListener(type, listener) {
        const listeners = this[pListeners][type];

        if(!listeners) {
            this[pListeners][type] = [listener];
        } else if(listeners.indexOf(listener) !== -1) {
            listeners.push(listener);
        }
    }

    removeEventListener(type, listener) {
        const listeners = this[pListeners][type];

        if(listeners) {
            let index = listeners.indexOf(listener);
            if(index !== -1) {
                listeners.splice(index, 1);
            }

            if(!listeners.length) {
                delete this[pListeners][type];
            }
        }
    }

    dispatchEvent(e) {
        if(!(e instanceof ObjectEvent || Object.getPrototypeOf(e) instanceof ObjectEvent)) {
            throw new TypeError("Argument 1 of ObjectEventTarget.dispatchEvent has to be an instance of ObjectEvent");
        }

        e[pTarget] = this;
        e[pEventPhase] = ObjectEvent.PHASE_AT_TARGET;
        this[pDispatchEvent](e);

        e[pEventPhase] = ObjectEvent.PHASE_SINKING;
        if(e.propagates && !e.propagationStopped) {
            propagate(this, e);
        }

        return !e.defaultPrevented;
    }

    createPromise(type) {
        return new Promise((resolve) => {
            this.addEventListener(type, function(e) {
                resolve(e);
            });
        });
    }
};

ObjectEventTarget.prototype[pDispatchEvent] = function(e) {
    let listeners = this[pListeners][e.type];

    e[pCurrentTarget] = this;
    if(listeners) {
        listeners = listeners.slice();
        for(let listener of listeners) {
            if(typeof(listener) === "function") {
                listener.call(this, e);
            } else if(typeof(listener) === "object" && listener.isPromise) {
                listener.resolve(e);
            }
        }
    }
};

export const initTarget = function(_pTarget, _pEventPhase, _pCurrentTarget) {
    pTarget = _pTarget;
    pEventPhase = _pEventPhase;
    pCurrentTarget = _pCurrentTarget;
};

export const Target = ObjectEventTarget;
