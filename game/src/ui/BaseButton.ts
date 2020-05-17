import PointerEvents from "./PointerEvents";

export default abstract class BaseButton extends PIXI.Container{
    protected state: ButtonStates;
    protected label: PIXI.Text;
    protected clickCallback: (...args: any[]) => void;

    constructor(enabled = true) {
        super();
        this.setEventListeners();
        this.setEnabled(enabled);
    }

    public setLabel(text: string, style?: PIXI.TextStyleOptions) {
        this.label = new PIXI.Text(text, style);
        this.label.anchor.set(0.5);
        this.label.x = this.width / 2;
        this.label.y = this.height / 2;
        this.addChild(this.label);
    }

    public setEnabled(enabled: boolean) {
        this.interactive = enabled;
        this.state = enabled ? ButtonStates.UP : ButtonStates.OFF;
        this.update();
    }

    public setClickCallback(callback: (...args: any[]) => void) {
        this.clickCallback = callback;
    }

    protected setEventListeners() {
        this.on(PointerEvents.OVER, this.onMouseOver, this);
        this.on(PointerEvents.ROLLOUT, this.onMouseOut, this);
        this.on(PointerEvents.DOWN, this.onMouseDown, this);
        this.on(PointerEvents.UP, this.onMouseUp, this);
    }

    protected onMouseOver() {
        this.state = ButtonStates.OVER;
        this.update();
    }

    protected onMouseOut() {
        this.state = ButtonStates.UP;
        this.update();
    }

    protected onMouseDown() {
        this.state = ButtonStates.DOWN;
        this.update();
    }

    protected onMouseUp() {
        this.state = ButtonStates.UP;
        this.update();
        if (this.clickCallback) {
            this.clickCallback();
        }
    }

    abstract update();
}

export enum ButtonStates {
    UP = "UP",
    DOWN = "DOWN",
    OVER = "OVER",
    OFF = "OFF"
}