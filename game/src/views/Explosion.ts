import GameObject from "./GameObject";
import Game from "../controller/Game";

export default class Explosion extends GameObject {
    constructor(bound: PIXI.Graphics) {
        super("explosion", bound, 60);
        this.anchor.set(0.5);
        this.loop = false;
        this.play();
        this.onComplete = () => this.explosionEnd();
    }

    explosionEnd() {
        if (this.name) {
            Game.stage.removeFromStage(this.name);
        }
    }
}