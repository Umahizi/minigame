import BaseState from "./BaseState";
import ViewManager from "../views/ViewManager";
import InitView from "../views/InitView";

export default class InitState extends BaseState {
    enter() {
        ViewManager.init(window.innerWidth, window.innerHeight);
        document.getElementById("game_content").appendChild(ViewManager.domView);
        const initView = new InitView(() => this.readyToExit(initView));
        ViewManager.stage.addChild(initView);
    }

    readyToExit(view: PIXI.Container) {
        view.parent.removeChild(view);
        view.destroy();
        this.exit();
    }

}