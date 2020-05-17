import "pixi.js";
import "lodash";
import "gsap";
import StateMachine from "./states/StateMachine";
import PreloadState from "./states/PreloadState";
import InitState from "./states/InitState";
import SetupGame from "./states/SetupGame";
import InGame from "./states/InGame";

window.onload = () => {
   
    StateMachine.init([
        new PreloadState(),
        new InitState(),
        new SetupGame(),
        new InGame()
    ])
}