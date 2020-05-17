import BaseState from "./BaseState";

/**
 * A Verry primitive state machine
 */
class StateMachine {

    init(states: BaseState[]) {
        for (let id = 0; id < states.length; id++) {
            const nextId = id < states.length - 1 ? id + 1 : 1;
            states[id].registerNext(states[nextId]);
        }
        states[0].enter();
    }
}

export default new StateMachine()