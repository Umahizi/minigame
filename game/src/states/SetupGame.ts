import BaseState from "./BaseState";
import GameStage from "../views/GameStage";
import ViewManager from "../views/ViewManager";
import Player from "../views/Player";
import Game from "../controller/Game";

export default class SetupGame extends BaseState {
    enter() {
        Game.init(ViewManager.width, ViewManager.height);
        ViewManager.stage.addChild(Game.stage);
        const player = new Player(Game.stage.gameBounds);
        Game.stage.addToGameStage("player", player);
        Game.interactionManager.registerOnClick(player.showPointer.bind(player));
        Game.interactionManager.registerOnMove(player.rotate.bind(player));
        this.exit();
    }
}