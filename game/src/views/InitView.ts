import ViewManager from "./ViewManager";
import ShapeButton from "../ui/ShapeButton";

export default class InitView extends PIXI.Container {

    protected bg: PIXI.Graphics;
    protected button: ShapeButton;
    constructor(callback: (...args: any[]) => void) {
        super();
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0x3E4144);
        this.bg.lineStyle(10, 0x333638, 1);
        const width = ViewManager.width / 1.5;
        this.bg.drawRoundedRect(0, 0, width, width / 2, 15);
        this.bg.endFill();
        this.bg.x = ViewManager.width / 2 - this.bg.width / 2;
        this.bg.y = ViewManager.height / 2 - this.bg.height / 2;
        this.addChild(this.bg);

        const shape = new PIXI.RoundedRectangle(0, 0, this.bg.width / 2, 50, 5);
        this.button = new ShapeButton(shape, {up: 0x8BC558, over: 0xb1e682});
        this.button.setLabel("Start Game", {fontSize: 20, fill: 0xffffff});
        this.button.x = this.bg.x + this.bg.width / 2 - this.button.width / 2;
        this.button.y = this.bg.y + this.bg.height / 2 - this.button.height / 2;
        this.addChild(this.button);
        this.button.setEnabled(true);
        this.button.setClickCallback(callback);
    }
}