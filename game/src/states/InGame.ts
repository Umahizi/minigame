import BaseState from "./BaseState";
import Game from "../controller/Game";

export default class InGame extends BaseState {
    enter() {
       Game.interactionManager.enable();
    }
}