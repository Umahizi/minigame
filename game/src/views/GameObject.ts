import AssetManager from "../helpers/AssetManager"
import { TweenMax, Linear } from "gsap";

export default abstract class GameObject extends PIXI.extras.AnimatedSprite {
    public name: string;

    protected speed: number;
    protected motionBound: PIXI.Graphics;

    constructor(texture: string, bound: PIXI.Graphics, fps = 16, autoUpdate: boolean = true ) {
        const textures = AssetManager.getAnimationFrames(texture);
        super(textures, autoUpdate);
        this.motionBound = bound;
        this.animationSpeed = fps / 60;
        this.speed = 10;
    }

    public moveTo(newX: number, newY: number) {
        if (!this.playing) {
            this.play();
            this.loop = true;

        }
        const dx = newX - this.x;
        const dy = newY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const factor = distance / this.speed;
        TweenMax.to(this, 0.5 * factor, {x: newX, y: newY, ease: Linear.easeNone, onComplete: () => {
            this.onMoveComplete();
        }})
    }

    public rotate(e) {
        const originalEvent = e.data ? e.data.originalEvent : e;
            if (originalEvent.pageX !== null && originalEvent.clientX != null) {
            const angle = Math.atan2(originalEvent.pageX - this.x, -(originalEvent.pageY - this.y));
            this.rotation = angle;
        }
    }

    onMoveComplete() {
        this.stop();
        this.loop = false;
    }

}