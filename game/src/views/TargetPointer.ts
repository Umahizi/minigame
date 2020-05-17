import { TweenMax, TimelineMax } from "gsap";

export default class TargetPointer extends PIXI.Sprite {
    constructor(pointerCallback: (...args: any[]) => void) {
        const pointer = new PIXI.Graphics();
        pointer.lineStyle(4, 0xff0000);
        pointer.drawCircle(0, 0, 25);
        super(pointer.generateCanvasTexture());

        this.playPointerAnimation(0.5, pointerCallback);
        this.anchor.set(0.5);
        this.scale.x = this.scale.y = 0.01;
    }

    protected playPointerAnimation(duration: number, pointerCallback: (...args: any[]) => void){
        const tl = new TimelineMax({paused: true, onComplete: pointerCallback});
        tl.addLabel("start", 0);
        tl.to(this.scale, duration, {x: 1, y: 1}, "start");
        tl.to(this, duration, {alpha: 0}, "start");
        tl.play();
    }
}