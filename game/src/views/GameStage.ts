import GameObject from "./GameObject";

export default class GameStage extends PIXI.Container {
    protected bound: PIXI.Graphics;
    protected gameObjects: Map<string, PIXI.DisplayObject>;
    constructor(width: number, height: number) {
        super();
        this.bound = new PIXI.Graphics();
        this.bound.beginFill(0x252729, 1);
        this.bound.drawRect(0, 0, width, height);
        this.bound.endFill();
        this.addChild(this.bound);
        this.gameObjects = new Map<string, GameObject>();
    }

    public get gameBounds(): PIXI.Graphics {
        return this.bound;
    }

    public getGameObject(name: string): PIXI.DisplayObject {
        if (this.gameObjects.has(name)) {
            return this.gameObjects.get(name);
        }
        console.warn("Object does not exist");
        return;
    }

    public addToGameStage(name: string, obj: PIXI.DisplayObject) {
        this.addChild(obj);
        this.gameObjects.set(name, obj);
    }

    public hasOnGameStage(name: string): boolean {
        return this.gameObjects.has(name);
    }


    public removeFromStage(name: string) {
        const idx = this.gameObjects.has(name);
        if (this.gameObjects.has(name)) {
            const obj = this.gameObjects.get(name);
            obj.parent.removeChild(obj);
            this.gameObjects.delete(name);
            obj.destroy();
        }
    }
}