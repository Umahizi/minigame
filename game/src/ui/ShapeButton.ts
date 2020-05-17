import BaseButton, { ButtonStates } from "./BaseButton"

export type ButtonTint = {up: number, over?: number, down?: number, off?: number} ;
export type PIXIShape = PIXI.Circle | PIXI.Rectangle | PIXI.Ellipse | PIXI.Polygon | PIXI.RoundedRectangle ;

export default class ShapeButton extends BaseButton {
    protected bg: PIXI.Graphics;
    protected tint: ButtonTint;

    constructor(shape: PIXIShape, tintConfig: ButtonTint) {
        super();
        this.bg = new PIXI.Graphics();
        this.bg.beginFill(0xffffff);
        this.bg.drawShape(shape);
        this.bg.endFill();
        this.addChild(this.bg);
        this.parseTintConfig(tintConfig);
        this.update();
    }

    protected parseTintConfig(tintConfig: ButtonTint) {
        this.tint = tintConfig;
        this.tint.down = this.tint.down || this.tint.up;
        this.tint.over = this.tint.over || this.tint.up;
        this.tint.off = this.tint.off || this.tint.up;

    }

    update() {
        if (!this.tint) {
            return;
        }
        switch (this.state) {
            case ButtonStates.UP:
                this.bg.tint = this.tint.up;
                break;
            case ButtonStates.DOWN:
                this.bg.tint = this.tint.down;
                break;
            case ButtonStates.OVER:
                this.bg.tint = this.tint.over;
                break;
            case ButtonStates.OFF:
                this.bg.tint = this.tint.off;
                break;
        }
    }
}
