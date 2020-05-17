import GameObject from "./GameObject";

export default abstract class SpawningGameObject extends GameObject {
    spawn(): GameObject {
        const spawn = this.createSpawnObject();
        spawn.x = this.x;
        spawn.y = this.y;
        return spawn;
    }

    abstract createSpawnObject(): GameObject;
}