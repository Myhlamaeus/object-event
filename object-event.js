import {initEvent} from "./lib/event";
import {initTarget} from "./lib/target";

var pTarget = Symbol("target"),
    pEventPhase = Symbol("event phase"),
    pCurrentTarget = Symbol("current target");

initEvent(pTarget, pEventPhase, pCurrentTarget);
initTarget(pTarget, pEventPhase, pCurrentTarget);

export {Event} from "./lib/event";
export {Target} from "./lib/target";
