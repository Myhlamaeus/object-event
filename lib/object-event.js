/*
 * object-event
 * https://github.com/ileri/object-event
 *
 * Copyright (c) 2014 Malte-Maurice Dreyer
 * Licensed under the MIT license.
 */

"use strict";

import {initEvent} from "./event";
import {initTarget} from "./target";

var pTarget = Symbol("target"),
    pEventPhase = Symbol("event phase"),
    pCurrentTarget = Symbol("current target");

initEvent(pTarget, pEventPhase, pCurrentTarget);
initTarget(pTarget, pEventPhase, pCurrentTarget);

export {Event} from "./event";
export {Target} from "./target";

// var pDefaultPrevented = Symbol("default prevented"),
    // pPropagationStopped = Symbol("propagation stopped"),
    // pDispatchEvent = Symbol("dispatch event"),
    // pCurrentTarget = Symbol("current target"),
    // pEventPhase = Symbol("event phase"),
    // pTarget = Symbol("target"),
    // pListeners = Symbol("listeners");