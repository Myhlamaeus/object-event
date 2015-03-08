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
