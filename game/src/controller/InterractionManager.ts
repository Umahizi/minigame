import ViewManager from "../views/ViewManager";
import PointerEvents from "../ui/PointerEvents";

export default class InterractionManager {
    protected moveCallbacks: (( ...args: any[])  => void)[];
    protected clickCallbacks: ( (...args: any[]) => void )[];
    protected hitArea: PIXI.Container;
    constructor(hitArea: PIXI.Container) {
        this.moveCallbacks = [];
        this.clickCallbacks = [];
        this.hitArea = hitArea;
    }

    public enable() {
        this.hitArea.interactive = true;
        this.hitArea.on(PointerEvents.MOVE, (e) => this.onMove(e));
        this.hitArea.on(PointerEvents.UP, (e) => this.onClick(e));
        ViewManager.domView.addEventListener('contextmenu', (e) => {
            this.onClick(e)
          });
    }

    public dissable() {
        this.hitArea.interactive = false;
        this.hitArea.off(PointerEvents.MOVE, (e) => this.onMove(e));
        this.hitArea.off(PointerEvents.UP, (e) => this.onClick(e));
    }

    public registerOnClick(callback: (...args: any[]) => void) {
        this.clickCallbacks.push(callback);
    }

    public removeOnClick(callback: (...args: any[]) => void) {
        const idx = this.clickCallbacks.indexOf(callback);
        if (idx != -1) {
            this.clickCallbacks.splice(idx, 1);
        }
    }

    public registerOnMove(callback: (...args: any[]) => void) {
        this.moveCallbacks.push(callback);
    }

    public removeOnMove(callback: (...args: any[]) => void) {
        const idx = this.moveCallbacks.indexOf(callback);
        if (idx != -1) {
            this.moveCallbacks.splice(idx, 1);
        }
    }

    protected onMove(e) {
        this.moveCallbacks.forEach( callback => {
            callback(e);
        });
    }

    protected onClick(e) {
        this.clickCallbacks.forEach( callback => {
            callback(e);
        });
    }

}