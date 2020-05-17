import SpawningGameObject from "./SpawningGameObject";
import GameObject from "./GameObject";
import Rocket from "./Rocket";
import AssetManager from "../helpers/AssetManager";
import { extras } from "pixi.js";
import Game from "../controller/Game";
import TargetPointer from "./TargetPointer";

export default class Player extends SpawningGameObject {
    protected pointer: PIXI.Sprite;

    constructor(bound: PIXI.Graphics) {
        super("sniper", bound);
        this.anchor.set(0.5);
        this.x = bound.width / 2 ;
        this.y = bound.height / 2;
        this.pointer = new PIXI.Sprite(AssetManager.generateGradientTexture(["rgb(37, 39, 41)", "red", "red"], false));
        this.pointer.height = 200;
        this.pointer.x = -this.width / 2 + this.width * 0.25;
        this.pointer.y = -this.pointer.height - this.height / 2;
        this.addChild(this.pointer);
        this.speed = 50;
    }

    public showPointer(e) {
        const originalEvent = e.data ? e.data.originalEvent : e;
        const button = originalEvent.which || originalEvent.button || 0;
        switch (button) {
            case 1:
                const spawn = this.spawn();
                let rocketIndex = 0;
                while (Game.stage.hasOnGameStage("rocket_" + rocketIndex)) {
                    rocketIndex++;
                }
                spawn.rotation = this.rotation;
                spawn.moveTo(originalEvent.pageX, originalEvent.pageY);
                spawn.name = "rocket_" + rocketIndex;
                Game.stage.addToGameStage(spawn.name, spawn);
                break;
            case 3:
                this.point(originalEvent.pageX, originalEvent.pageY);
                this.moveTo(originalEvent.pageX, originalEvent.pageY);
            default:
                break;
        }
    }

    public point(x: number, y: number) {
        let pointerName: string;
        const pointer = new TargetPointer(() => {
            Game.stage.removeFromStage(pointerName);
        });
        pointer.x = x;
        pointer.y = y;
        let pointerIndex = 0;

        while (Game.stage.hasOnGameStage("pointer_" + pointerIndex)) {
            pointerIndex++;
        }

        pointerName = "pointer_" + pointerIndex;
        Game.stage.addToGameStage(pointerName, pointer);
    }

    createSpawnObject(): GameObject {
        return new Rocket(this.motionBound);
    }
}