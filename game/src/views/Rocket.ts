import SpawningGameObject from "./SpawningGameObject";
import Explosion from "./Explosion";
import GameObject from "./GameObject";
import Game from "../controller/Game";

export default class Rocket extends SpawningGameObject {
    constructor(bound: PIXI.Graphics) {
        super("rocket", bound);
        this.speed = 200;
    }

    onMoveComplete() {
        super.onMoveComplete();
        const spawn = this.spawn();
        let explosionIndex = 0;
        while (Game.stage.hasOnGameStage("explosion_" + explosionIndex)) {
            explosionIndex++;
        }
        spawn.name = "explosion_" + explosionIndex;
        Game.stage.addToGameStage(spawn.name, spawn);
        if (this.name) {
            Game.stage.removeFromStage(this.name);
        }
    }

    createSpawnObject(): GameObject {
        return new Explosion(this.motionBound);
    }
}