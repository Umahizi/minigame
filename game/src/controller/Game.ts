import GameStage from "../views/GameStage";
import InterractionManager from "./InterractionManager";

class Game {
    protected _stage: GameStage;
    protected _interactionManager: InterractionManager;

    init(width: number, height: number) {
        this._stage = new GameStage(width, height);
        this._interactionManager = new InterractionManager(this._stage);
    }

    public get stage(): GameStage {
        return this._stage;
    }

    public get interactionManager(): InterractionManager {
        return this._interactionManager;
    }
}

export default new Game();