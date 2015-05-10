import {initEvent} from './lib/event'
import {initTarget} from './lib/target'

const pTarget = Symbol('target')
const pEventPhase = Symbol('event phase')
const pCurrentTarget = Symbol('current target')

initEvent(pTarget, pEventPhase, pCurrentTarget)
initTarget(pTarget, pEventPhase, pCurrentTarget)

export {Event} from './lib/event'
export {Target} from './lib/target'
