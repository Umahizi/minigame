import BaseState from "./BaseState";
import * as asset_config from "../../configs/assets_config.json";


export default class PreloadState extends BaseState {
    enter() {
        asset_config.resources.initial.forEach(asset => {
            PIXI.loader.add(asset.name, asset.src);
        });
        PIXI.loader.load(() => this.exit());
    }
}